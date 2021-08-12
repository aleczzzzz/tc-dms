"use strict";
const Helpers = use("Helpers");
const fs = use("fs").promises;
const Drive = use("Drive");
const Document = use("App/Models/Document");
const DocumentKey = use("App/Models/DocumentKey");
const { snakeCase } = use("change-case");
const moment = use("moment");
const Fetch = use("Library/Fetch");

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

  async save({ request, response, $session }) {
    const {
      tccNumber,
      rulingType,
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
      rulingType,
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
          "recordsDate",
          "chairDate",
          "endorseDate",
          "requestDate",
          "noticeDate",
          "draftDate",
          "finalizeDate",
          "issueDate",
          "additionalInfoRequestDate",
          "additionalInfoSubmissionDate",
          "dropDate",
        ];

        out[snakeCase(key)] = castDatesRack.includes(key)
          ? request.input(key)
            ? moment(request.input(key), "MMMM D, YYYY").format("YYYY-MM-DD")
            : null
          : request.input(key);

        return out;
      },
      {
        original_file_name: fileName,
        directory_file_name: `${uid}.pdf`,
        created_by: $session.user.id,
      }
    );

    document.merge(merge);

    await document.save();

    return response
      .status(200)
      .send({ message: "Successfully saved document" });
  }

  async update({ request, response, $session }) {
    const {
      tccNumber,
      rulingType,
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
      id,
    } = request.input("document");

    const document = await Document.find(id);

    const merge = Object.keys({
      tccNumber,
      rulingType,
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
          "recordsDate",
          "chairDate",
          "endorseDate",
          "requestDate",
          "noticeDate",
          "draftDate",
          "finalizeDate",
          "issueDate",
          "additionalInfoRequestDate",
          "additionalInfoSubmissionDate",
          "dropDate",
        ];

        out[snakeCase(key)] = castDatesRack.includes(key)
          ? request.input("document")[key]
            ? moment(request.input("document")[key], "MMMM D, YYYY").format(
                "YYYY-MM-DD"
              )
            : null
          : request.input("document")[key];

        return out;
      },
      {
        updated_by: $session.user.id,
      }
    );
    document.merge(merge);

    await document.save();

    return response
      .status(200)
      .send({ message: "Successfully updated document" });
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
    let q = Document.query().orderBy("id", "desc");

    const castDatesRack = [
      "records_date",
      "chair_date",
      "endorse_date",
      "request_date",
      "notice_date",
      "draft_date",
      "finalize_date",
      "issue_date",
      "additional_info_request_date",
      "additional_info_submission_date",
      "drop_date",
    ];

    let s;
    let d;

    const FetchInstance = new Fetch(q);
    if (castDatesRack.includes(key)) {
      q.where(key, moment(search, "MMMM D, YYYY").format("YYYY-MM-DD"));
      const { status, ...data } = await FetchInstance.get(limit, page);
      s = status;
      d = data;
    } else {
      const { status, ...data } = await FetchInstance.search([key], search).get(
        limit,
        page
      );
      s = status;
      d = data;
    }

    return response.status(s).send(d);
  }

  async getDocument({ request, response }) {
    const { id } = request.all();
    let document = (await Document.find(id)).toJSON();
    const stats = await fs.stat(
      Helpers.appRoot(`storage/document/${document.directory_file_name}`)
    );
    document.size = stats.size;

    const castDatesRack = [
      "records_date",
      "chair_date",
      "endorse_date",
      "request_date",
      "notice_date",
      "draft_date",
      "finalize_date",
      "issue_date",
      "additional_info_request_date",
      "additional_info_submission_date",
      "drop_date",
    ];

    Object.keys(document).forEach((k) => {
      if (castDatesRack.includes(k)) {
        document[k] = document[k]
          ? moment(document[k]).format("MMMM D, YYYY")
          : document[k];
      }
    });

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

  async updateFileName({ request, response }) {
    const { id, filename } = request.all();
    const document = await Document.find(id);
    document.merge({ original_file_name: filename });

    const files = await fs.readdir(Helpers.appRoot("storage/chunk/document"));
    const uid = document.directory_file_name.split(".")[0];
    const chunks = files.filter((file) => file.includes(uid));
    const parts = await Promise.all(
      chunks.map(async (chunk) => await Drive.get(`chunk/document/${chunk}`))
    );

    await Drive.put(`document/${uid}.pdf`, Buffer.concat(parts));
    await Promise.all(
      chunks.map(async (chunk) => await Drive.delete(`chunk/document/${chunk}`))
    );
    await document.save();

    return response.status(200).send({
      message: "Successfully updated filename.",
    });
  }

  async delete({ request, response }) {
    const id = request.input("id");
    const document = await Document.find(id);
    await Drive.delete(`document/${document.directory_file_name}`);
    await document.delete();

    return response.status(200).send({
      message: "Successfully deleted document.",
    });
  }
}

module.exports = DocumentController;
