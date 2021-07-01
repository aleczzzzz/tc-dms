"use strict";

const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("first_name", 100).notNullable();
      table.string("middle_name", 100).notNullable();
      table.string("last_name", 100).notNullable();
      table.string("email", 100).notNullable();
      table.string("username", 16).notNullable().unique();
      table.string("password", 255).notNullable();
      table.integer("role_id").unsigned().references("id").inTable("roles");
      table.integer("is_password_changed").notNullable();
      table.integer("status").notNullable().index();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UsersSchema;
