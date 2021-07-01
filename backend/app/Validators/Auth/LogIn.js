"use strict";
const { generateValidationMessage } = use(
  "Library/Validator/MessageSerializer.js"
);

class AuthLogIn {
  get data() {
    this.ctx.response.clearCookie("token");

    return this.ctx.request.all();
  }

  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required|string",
      password: "required|string",
    };
  }

  get messages() {
    return generateValidationMessage(this.rules);
  }

  get sanitizationRules() {
    return {
      username: "toUpper",
    };
  }

  async fails(err) {
    const errorMessage = err.map(({ message }) => message);

    return this.ctx.response.status(400).send({ message: errorMessage });
  }
}

module.exports = AuthLogIn;
