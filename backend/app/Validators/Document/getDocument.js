"use strict";
const { generateValidationMessage } = use(
  "Library/Validator/MessageSerializer.js"
);
const Document = use("App/Models/Document");

class DocumentGetDocument {
  async authorize() {
    const { id } = this.ctx.request.all();
    if (!this.ctx.$session.modules.includes(205)) {
      return this.ctx.response.status(403).json({
        message: "You are not allowed access this method.",
      });
    }

    const document = await Document.find(id);

    if (!document) {
      return this.ctx.response.status(403).json({
        message: "Document does not exist.",
      });
    }

    return true;
  }

  async fails(err) {
    const errorMessage = err.map(({ message }) => message);

    return this.ctx.response.status(400).send({ message: errorMessage });
  }
}

module.exports = DocumentGetDocument;
