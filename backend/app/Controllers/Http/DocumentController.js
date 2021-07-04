"use strict";
const Helpers = use("Helpers");
const fs = use("fs").promises;
const Drive = use("Drive");
const Document = use("App/Models/Document");
const DocumentKey = use("App/Models/DocumentKey");
const { snakeCase } = use("change-case");
const moment = use("moment");

class DocumentController {
  async upload({ request, response }) {
    const { resumableChunkNumber, resumableIdentifier, resumableTotalChunks } =
      request.all();
    const file = request.file("file");

    await file.move(Helpers.appRoot("storage/chunk/document"), {
      name: `${`${resumableChunkNumber}`.padStart(
        `${resumableTotalChunks}`.length + 1,
        "0"
      )}_${resumableIdentifier}.part`,
      overwrite: true,
    });

    return response.status(200).send("Successfully upload file");
  }

  async save({ request, response }) {
    const {
      tccNumber,
      rullingType,
      nameOfArticle,
      ahtnCode,
      content,
      applicantCompanyName,
      applicantName,
      applicantEmail,
      applicantNumber,
      assignedTo,
      qrt,
      recordsDate,
      chairDate,
      endorseDate,
      requestDate,
      noticeDate,
      draftDate,
      finalizeDate,
      issueDate,
      additionalInfoRequestDate,
      additionalInfoSubmissionDate,
      dropDate,
      remarks,
      fileName,
      uid,
    } = request.all();

    const files = await fs.readdir(Helpers.appRoot("storage/chunk/document"));
    const chunks = files.filter((file) => file.includes(uid));
    const parts = await Promise.all(
      chunks.map(async (chunk) => await Drive.get(`chunk/document/${chunk}`))
    );

    await Drive.put(`document/${uid}.pdf`, Buffer.concat(parts));

    await Promise.all(
      chunks.map(async (chunk) => await Drive.delete(`chunk/document/${chunk}`))
    );

    const document = new Document();

    const merge = Object.keys({
      tccNumber,
      rullingType,
      nameOfArticle,
      ahtnCode,
      content,
      applicantCompanyName,
      applicantName,
      applicantEmail,
      applicantNumber,
      assignedTo,
      qrt,
      recordsDate,
      chairDate,
      endorseDate,
      requestDate,
      noticeDate,
      draftDate,
      finalizeDate,
      issueDate,
      additionalInfoRequestDate,
      additionalInfoSubmissionDate,
      dropDate,
      remarks,
    }).reduce(
      (out, key) => {
        const castDatesRack = [
          recordsDate,
          chairDate,
          endorseDate,
          requestDate,
          noticeDate,
          draftDate,
          finalizeDate,
          issueDate,
          additionalInfoRequestDate,
          additionalInfoSubmissionDate,
        ];

        out[snakeCase(key)] = castDatesRack.includes(key)
          ? moment(request.input(key), "MMMM D, YYYY").toISOString()
          : request.input(key);

        return out;
      },
      {
        original_file_name: fileName,
        directory_file_name: `${uid}.pdf`,
      }
    );

    document.merge(merge);

    await document.save();

    return response
      .status(200)
      .send({ message: "Successfully saved document" });
  }

  async getDocumentKeys({ response }) {
    const keys = await DocumentKey.all();

    return response.status(200).send({
      message: "Successfully fetched document key/s",
      data: keys.toJSON().map((k) => ({ ...k, name: k.name.toUpperCase() })),
    });
  }

  async getDocuments({ request, response }) {
    const { search, key, limit, page } = request.all();
    let data;
    let q = Document.query();

    if (search && search.length > 0) {
      const s = search
        .split(" ")
        .filter((s) => s.trim().length > 0)
        .join("|");

      q.where(key, "~", s);
    }

    if (limit && page) data = (await q.paginate(page, limit)).toJSON();
    else {
      limit && q.limit(limit);

      data = { data: (await q.fetch()).toJSON() };
    }

    const status = data.data.length > 0 ? 200 : 404;
    const message =
      data.data.length > 0 ? "Successfully fetched data" : "No data found.";

    return response.status(status).send({
      message,
      data: data.data || [],
    });
  }

  async getDocument({ request, response }) {
    const { id } = request.all();
    let document = (await Document.find(id)).toJSON();
    const stats = await fs.stat(
      Helpers.appRoot(`storage/document/${document.directory_file_name}`)
    );
    document.size = stats.size;
    return response.status(200).send({
      message: "Successfully fetched document.",
      data: document,
    });
  }

  async downloadFile({ request, response }) {
    const { id } = request.all();
    let document = (await Document.find(id)).toJSON();
    const file = await Drive.get(`document/${document.directory_file_name}`);
    const blob = file.toString("base64");
    
    return response.status(200).send({
      message: "Successfully fetched file.",
      data: blob,
    });
  }
}

module.exports = DocumentController;
