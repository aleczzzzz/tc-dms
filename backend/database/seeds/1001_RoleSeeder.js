"use strict";

const Database = use("Database");
const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    await Database.raw("TRUNCATE TABLE roles RESTART IDENTITY CASCADE;");
    const roles = ["superadmin", "user"];

    await Role.createMany(roles.map((role) => ({ role })));
  }
}

module.exports = RoleSeeder;
