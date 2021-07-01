"use strict";
const camelcaseKeys = use("camelcase-keys");

class Flatten {
  async handle({ response }, next) {
    await next();
    const content = response.lazyBody.content;

    const serialized =
      typeof content == "object"
        ? camelcaseKeys(content, {
            deep: true,
          })
        : content;

    response.send(serialized);
  }
}

module.exports = Flatten;
