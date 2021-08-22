"use strict";
const { generateValidationMessage } = use(
  "Library/Validator/MessageSerializer.js"
);
const Document = use("App/Models/Document");

class DocumentGetDocuments {
  async authorize() {
    const { id } = this.ctx.request.all();
    if (!this.ctx.$session.modules.includes(206)) {
      return this.ctx.response.status(403).json({
        message: "You are not allowed access this method.",
      });
    }

    return true;
  }

  get rules() {
    return {
      search: "string",
      key: "string",
      limit: "integer",
      page: "integer",
    };
  }

  get messages() {
    return generateValidationMessage(this.rules);
  }

  get sanitizationRules() {
    return {
      search: "trim",
      key: "trim",
      limit: "trim|toInt",
      page: "trim|toInt",
    };
  }

  async fails(err) {
    const errorMessage = err.map(({ message }) => message);

    return this.ctx.response.status(400).send({ message: errorMessage });
  }
}

module.exports = DocumentGetDocuments;
