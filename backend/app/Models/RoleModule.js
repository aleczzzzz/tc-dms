"use strict";

const Model = use("Model");

class RoleModule extends Model {
  static get table() {
    return "role_module";
  }

  static boot() {
    super.boot();

    this.addTrait("NoTimestamp");
  }

  role() {
    return this.belongsTo("App/Models/Role", "role_id", "id");
  }

  module() {
    return this.belongsTo("App/Models/Module", "module_code", "code");
  }
}

module.exports = RoleModule;
