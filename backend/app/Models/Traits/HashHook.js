"use strict";
const Hash = use("Hash");

class HashHook {
  async register(Model, { checkDirty, key, action: _action }) {
    //Model.addTrait('HashHook', { checkDirty, key, action })
    if (!key) throw "Please define key";
    const action = _action || "beforeCreate";

    Model.addHook(action, async (entry) => {
      if ((checkDirty && entry.dirty[key]) || !checkDirty)
        entry[key] = await Hash.make(entry[key]);
    });
  }
}

module.exports = HashHook;
