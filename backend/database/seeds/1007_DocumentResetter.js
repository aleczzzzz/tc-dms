"use strict";

const Database = use("Database");

class DocumentResetter {
  async run() {
    await Database.raw("TRUNCATE TABLE documents RESTART IDENTITY CASCADE;");
  }
}

module.exports = DocumentResetter;
