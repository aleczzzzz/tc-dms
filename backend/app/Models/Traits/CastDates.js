"use strict";

class CastDates {
  register(Model) {
    Model.castDates = (field, value) => {
      return value.format("MMMM D, YYYY - h:mm:ss A");
    };
  }
}

module.exports = CastDates;
