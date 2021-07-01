"use strict";

const Model = use("Model");

class DocumentKey extends Model {
  static boot() {
    super.boot();

    this.addTrait("NoTimestamp");
  }
}

module.exports = DocumentKey;
