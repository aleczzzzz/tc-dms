"use strict";

const Database = use("Database");
const User = use("App/Models/User");
const Drive = use("Drive");

class UserSeeder {
  async run() {
    await Database.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
    const users = JSON.parse(await Drive.get("seeds/Users.json", "utf8"));
    await User.createMany(users);
  }
}

module.exports = UserSeeder;
