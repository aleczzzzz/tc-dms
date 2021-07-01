"use strict";

const Schema = use("Schema");

class RoleModuleSchema extends Schema {
  up() {
    this.create("role_module", (table) => {
      table.increments();
      table.integer("role_id").unsigned().references("id").inTable("roles");
      table.integer("module_code").references("module_code").inTable("modules");
    });
  }

  down() {
    this.drop("role_module");
  }
}

module.exports = RoleModuleSchema;
