"use strict";

const Database = use("Database");
const Drive = use("Drive");

class DocumentResetter {
  async run() {
    await Database.raw("TRUNCATE TABLE documents RESTART IDENTITY CASCADE;");
    await Drive.delete("chunk");
    await Drive.delete("document");
  }
}

module.exports = DocumentResetter;
