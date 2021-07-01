"use strict";

const Schema = use("Schema");

class RoleSchema extends Schema {
  up() {
    this.create("roles", (table) => {
      table.increments();
      table.string("role", 100).notNullable();
      table.integer("status").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("roles");
  }
}

module.exports = RoleSchema;
