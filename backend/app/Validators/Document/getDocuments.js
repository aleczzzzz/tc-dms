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

  async fails(err) {
    const errorMessage = err.map(({ message }) => message);

    return this.ctx.response.status(400).send({ message: errorMessage });
  }
}

module.exports = DocumentGetDocuments;
