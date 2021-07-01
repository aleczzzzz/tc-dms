"use strict";

const Database = use("Database");
const RoleModule = use("App/Models/RoleModule");
const Drive = use("Drive");

class RoleModuleSeeder {
  async run() {
    await Database.raw("TRUNCATE TABLE role_module RESTART IDENTITY CASCADE;");

    const roleModule = JSON.parse(
      await Drive.get("seeds/RoleModule.json", "utf8")
    );

    await RoleModule.createMany(roleModule);
  }
}

module.exports = RoleModuleSeeder;
