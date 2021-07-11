"use strict";

const Schema = use("Schema");

class DocumentKey extends Schema {
  up() {
    this.create("document_keys", (table) => {
      table.increments();
      table.string("name", 255).notNullable().index();
      table.string("key", 255).notNullable().index();
      table.string("type", 255).notNullable().index();
    });
  }

  down() {
    this.drop("document_keys");
  }
}

module.exports = DocumentKey;
