"use strict";

const Database = use("Database");
const Module = use("App/Models/Module");
const Drive = use("Drive");

class ModuleSeeder {
  async run() {
    await Database.raw("TRUNCATE TABLE modules RESTART IDENTITY CASCADE;");
    const modules = JSON.parse(await Drive.get("seeds/Modules.json", "utf8"));
 
    await Module.createMany(modules);
  }
}

module.exports = ModuleSeeder;
