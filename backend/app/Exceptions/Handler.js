"use strict";
const Logger = use("Logger");
const moment = use("moment");
const BaseExceptionHandler = use("BaseExceptionHandler");

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response }) {
    response.status(500).json({
      message: "Internal server error.",
      error:
        error.name == "SyntaxError"
          ? "Content body error"
          : this.sanitizeError(error),
    });
  }

  async report(error, { request }) {
    Logger.transport("error").error({
      timestamp: moment().format("MMMM D, YYYY - h:mm:ss A"),
      error: this.sanitizeError(error),
      request: request.all(),
      url: request.url(),
      method: request.method(),
      headers: request.headers(),
    });
  }

  sanitizeError(error) {
    return error.stack.replace(/\n\s+/gm, " ");
  }
}

module.exports = ExceptionHandler;
