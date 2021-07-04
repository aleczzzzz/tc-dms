"use strict";

const Schema = use("Schema");

class HitsSchema extends Schema {
  up() {
    this.create("documents", (table) => {
      table.increments();
      table.string("tcc_number", 255).notNullable().index();
      table.string("rulling_type", 2).notNullable().index();
      table.string("name_of_article", 255).notNullable().index();
      table.string("ahtn_code", 255).notNullable().index();
      table.string("content", 255).notNullable().index();
      table.string("applicant_company_name", 255).notNullable().index();
      table.string("applicant_name", 255).notNullable().index();
      table.string("applicant_email", 255).notNullable().index();
      table.string("applicant_number", 255).notNullable().index();
      table.string("assigned_to", 255).notNullable().index();
      table.string("qrt", 255).notNullable().index();
      table.date("records_date").notNullable().index();
      table.date("chair_date").notNullable().index();
      table.date("endorse_date").notNullable().index();
      table.date("request_date").notNullable().index();
      table.integer("boc_day_count").notNullable().index();
      table.date("notice_date").notNullable().index();
      table.integer("nosc_day_count").notNullable().index();
      table.date("draft_date").notNullable().index();
      table.integer("draft_day_count").notNullable().index();
      table.date("finalize_date").notNullable().index();
      table.integer("finalize_day_count").notNullable().index();
      table.date("issue_date").notNullable().index();
      table.date("additional_info_request_date").notNullable().index();
      table.integer("additional_info_day_count").notNullable().index();
      table.date("additional_info_submission_date").notNullable().index();
      table.date("drop_date").notNullable().index();
      table.text("remarks").notNullable();
      table.string("original_file_name", 255).notNullable().index();
      table.string("directory_file_name", 255).notNullable().index();
      table.timestamps();
    });
  }

  down() {
    this.drop("documents");
  }
}

module.exports = HitsSchema;
