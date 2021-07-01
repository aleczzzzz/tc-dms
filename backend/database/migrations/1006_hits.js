"use strict";

const Schema = use("Schema");

class HitsSchema extends Schema {
  up() {
    this.create("hits", (table) => {
      table.increments();
      table.string("transaction_id").notNullable().index();
      table.string("username").notNullable().index();
      table.string("ip").notNullable();
      table.text("url").notNullable();
      table.string("module").notNullable().index();
      table.string("method").notNullable().index();
      table.text("description").notNullable();
      table.integer("status").notNullable().index();
      table.timestamps();
    });
  }

  down() {
    this.drop("hits");
  }
}

module.exports = HitsSchema;
