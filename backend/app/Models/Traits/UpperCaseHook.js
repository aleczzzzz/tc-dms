"use strict";

class UpperCaseHook {
  register(Model, { key, action: _action }) {
    //Model.addTrait('UpperCaseHook', { key, action })
    if (!key) throw "Please define key";

    const action = _action || "beforeCreate";

    Model.addHook("beforeCreate", (entry) => {
      entry[key] = entry[key].toUpperCase();
    });
  }
}

module.exports = UpperCaseHook;
