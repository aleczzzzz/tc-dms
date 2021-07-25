"use strict";
const Model = use("Model");
const moment = use("moment");

class Document extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (documentInstance) => {
      documentInstance.records_date = documentInstance.records_date || null;
      documentInstance.chair_date = documentInstance.chair_date || null;
      documentInstance.endorse_date = documentInstance.endorse_date || null;
      documentInstance.request_date = documentInstance.request_date || null;
      documentInstance.notice_date = documentInstance.notice_date || null;
      documentInstance.draft_date = documentInstance.draft_date || null;
      documentInstance.finalize_date = documentInstance.finalize_date || null;
      documentInstance.issue_date = documentInstance.issue_date || null;
      documentInstance.additional_info_request_date =
        documentInstance.additional_info_request_date || null;
      documentInstance.additional_info_submission_date =
        documentInstance.additional_info_submission_date || null;
      documentInstance.drop_date = documentInstance.drop_date || null;
      documentInstance.remarks = documentInstance.remarks || null;

      documentInstance.boc_day_count = documentInstance.request_date
        ? moment().diff(moment(documentInstance.request_date), "days")
        : 0;

      documentInstance.nosc_day_count = documentInstance.endorse_date
        ? documentInstance.notice_date
          ? moment(documentInstance.notice_date).diff(
              moment(documentInstance.endorse_date),
              "days"
            )
          : moment().diff(moment(documentInstance.endorse_date), "days")
        : 0;

      documentInstance.draft_day_count = documentInstance.notice_date
        ? documentInstance.draft_date
          ? moment(documentInstance.draft_date).diff(
              moment(documentInstance.notice_date),
              "days"
            )
          : moment().diff(moment(documentInstance.notice_date), "days")
        : 0;

      documentInstance.finalize_day_count = documentInstance.finalize_date
        ? documentInstance.issue_date
          ? moment(documentInstance.issue_date).diff(
              moment(documentInstance.finalize_date),
              "days"
            )
          : moment().diff(moment(documentInstance.finalize_date), "days")
        : 0;

      documentInstance.additional_info_day_count =
        documentInstance.additional_info_request_date
          ? documentInstance.additional_info_submission_date
            ? moment(documentInstance.additional_info_submission_date).diff(
                moment(documentInstance.additional_info_request_date),
                "days"
              )
            : moment().diff(
                moment(documentInstance.additional_info_request_date),
                "days"
              )
          : 0;

      documentInstance.issuance_day_count = documentInstance.issue_date
        ? documentInstance.endorse_date
          ? moment(documentInstance.issue_date).diff(
              moment(documentInstance.endorse_date),
              "days"
            )
          : 0
        : 0;
    });
    this.addTrait("CastDates");
  }
}

module.exports = Document;
