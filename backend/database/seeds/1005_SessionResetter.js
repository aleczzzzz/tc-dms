"use strict";

const Database = use("Database");

class SessionResetter {
  async run() {
    await Database.raw("TRUNCATE TABLE sessions RESTART IDENTITY CASCADE;");
  }
}

module.exports = SessionResetter;
