"use strict";

const Database = use("Database");
const Drive = use("Drive");
const Helpers = use("Helpers");

class HitResetter {
  async run() {
    await Database.raw("TRUNCATE TABLE hits RESTART IDENTITY CASCADE;");
    await Drive.delete(Helpers.tmpPath("hits.log"));
  }
}

module.exports = HitResetter;
