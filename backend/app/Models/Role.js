"use strict";

const Model = use("Model");

class Role extends Model {
  static boot() {
    super.boot();

    this.addTrait("SetDefaultStatusHook");
    this.addTrait("UpperCaseHook", { key: "role" });
  }

  users() {
    return this.hasMany("App/Models/Role", "id", "user_id");
  }

  modules() {
    return this.belongsToMany(
      "App/Models/Module",
      "role_id",
      "module_code",
      "id",
      "module_code"
    ).pivotTable("role_module");
  }

  roleModule() {
    return this.hasMany("App/Models/RoleModule", "id", "role_id");
  }
}

module.exports = Role;
