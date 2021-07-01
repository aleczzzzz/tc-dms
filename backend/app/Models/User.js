"use strict";
const Hash = use("Hash");
const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addTrait("SetDefaultStatusHook", {
      key: "is_password_changed",
      status: 0,
    });
    this.addTrait("UpperCaseHook", { key: "username" });
    this.addTrait("HashHook", {
      checkDirty: true,
      key: "password",
      action: "beforeSave",
    });
    this.addTrait("NullToEmptyStringHook", {
      key: "middle_name",
      action: "beforeSave",
    });
    this.addTrait("SetDefaultStatusHook");
    this.addTrait("CastDates");
  }

  static get hidden() {
    return ["password"];
  }

  static get computed() {
    return ["fullName"];
  }

  getFullName({ first_name, middle_name, last_name }) {
    let fullname = first_name;

    fullname =
      middle_name.trim().length > 0 ? `${fullname} ${middle_name}` : fullname;

    fullname += ` ${last_name}`;

    return fullname;
  }

  role() {
    return this.belongsTo("App/Models/Role", "role_id", "id");
  }
}

module.exports = User;
