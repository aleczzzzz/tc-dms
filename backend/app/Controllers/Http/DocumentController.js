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
          ? moment(request.input(key), "MMMM D, YYYY").format("YYYY-MM-DD")
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
      data: keys.toJSON(),
    });
  }
}

module.exports = DocumentController;
