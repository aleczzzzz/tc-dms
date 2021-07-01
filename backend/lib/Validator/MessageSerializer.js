const fs = use("fs");
const Helpers = use("Helpers");

class Serializer {
  static getValidationMessage(validation) {
    return JSON.parse(
      fs.readFileSync(
        Helpers.appRoot("storage/validator/ValidationMessages.json"),
        "utf8"
      )
    )[validation];
  }

  static generateValidationMessage(data) {
    const messages = Object.keys(data)
      .map((_field) => {
        return data[_field]
          .split("|")
          .map((validation) => {
            return validation.split(":")[0];
          })
          .reduce((a, b) => {
            const message = Serializer.getValidationMessage(b);
            const field = _field.toUpperCase();
            if (message) a[`${_field}.${b}`] = eval("`" + message + "`");

            return a;
          }, {});
      })
      .reduce((a, b) => {
        return { ...a, ...b };
      }, {});

    return messages;
  }
}

module.exports = Serializer;
