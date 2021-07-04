"use strict";
const Model = use("Model");

class Document extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (documentInstance) => {
      documentInstance.boc_day_count = 1;
      documentInstance.nosc_day_count = 2;
      documentInstance.draft_day_count = 3;
      documentInstance.finalize_day_count = 4;
      documentInstance.additional_info_day_count = 5;
    });
    this.addTrait("CastDates");
  }
}

module.exports = Document;
