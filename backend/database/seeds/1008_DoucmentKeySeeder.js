"use strict";

const Database = use("Database");
const documentKey = use("App/Models/DocumentKey");
const Drive = use("Drive");

class DocumentKeySeeder {
  async run() {
    await Database.raw("TRUNCATE TABLE document_keys RESTART IDENTITY CASCADE;");

    const keys = JSON.parse(await Drive.get("seeds/DocumentKey.json", "utf8"));

    await documentKey.createMany(keys);
  }
}

module.exports = DocumentKeySeeder;
