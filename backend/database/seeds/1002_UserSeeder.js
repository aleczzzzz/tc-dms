"use strict";

const Database = use("Database");
const Role = use("App/Models/Role");
const User = use("App/Models/User");
const faker = use("chance").Chance();

class UserSeeder {
  async run() {
    await Database.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
    const roles = await Role.query()
      .setVisible(["id", "role"])
      .where("status", 1)
      .fetch();

    const users = roles.toJSON().map(({ id, role }) => ({
      username: role,
      role_id: id,
      password: "password",
      first_name: faker.first(),
      last_name: faker.last(),
      email: faker.email(),
    }));

    await User.createMany(users);
  }
}

module.exports = UserSeeder;
