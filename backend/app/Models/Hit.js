"use strict";

const Model = use("Model");

class Hit extends Model {
  static boot() {
    super.boot();

    this.addTrait("NullToEmptyStringHook", { key: "username" });
    this.addTrait("NullToEmptyStringHook", { key: "ip" });
  }
}

module.exports = Hit;
