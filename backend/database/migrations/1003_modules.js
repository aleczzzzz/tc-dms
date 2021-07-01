"use strict";

const Schema = use("Schema");

class ModulesSchema extends Schema {
  up() {
    this.create("modules", (table) => {
      table.integer("module_code").notNullable().unique().index();
      table.string("module", 250).notNullable();
      table.string("platform", 8).notNullable().index();
      table.integer("status").notNullable().index();
    });
  }

  down() {
    this.drop("modules");
  }
}

module.exports = ModulesSchema;
