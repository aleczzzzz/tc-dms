"use strict";

const Model = use("Model");

class Module extends Model {
  static boot() {
    super.boot();

    this.addTrait("NoTimestamp");
    this.addTrait("SetDefaultStatusHook");
  }

  static get primaryKey() {
    return "module_code";
  }

  roles() {
    return this.belongsToMany(
      "App/Models/Role",
      "module_code",
      "role_id",
      "module_code",
      "id"
    ).pivotTable("role_module");
  }

  roleModule() {
    return this.hasMany("App/Models/RoleModule", "module_code", "module_code");
  }
}

module.exports = Module;
