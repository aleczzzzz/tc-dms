"use strict";

class NullToEmptyStringHook {
  register(Model, { key, action: _action }) {
    //Model.addTrait('NullToEmptyStringHook', { key, action })
    if (!key) throw "Please define key";

    const action = _action || "beforeCreate";

    Model.addHook(action, (entry) => {
      entry[key] = entry[key] || "";
    });
  }
}

module.exports = NullToEmptyStringHook;
