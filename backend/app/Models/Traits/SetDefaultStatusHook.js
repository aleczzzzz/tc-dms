"use strict";

class SetDefaultStatusHook {
  register(Model, { key: _key, status: _status, action: _action }) {
    //Model.addTrait('SetDefaultStatusHook', { key, status, action })
    const key = _key || "status";
    const status = _status != undefined ? _status : 1;
    const action = _action || "beforeCreate";

    Model.addHook(action, (entry) => {
      entry[key] = status;
    });
  }
}

module.exports = SetDefaultStatusHook;
