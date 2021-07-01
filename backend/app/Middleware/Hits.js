"use strict";
const Logger = use("Logger");
const moment = use("moment");
const { v4 } = use("uuid");
const Hit = use("App/Models/Hit");
const { sentenceCase } = use("change-case");
// const AuthService = use("App/Controllers/Service/AuthService");
const Drive = use("Drive");

class Hits {
  async getDescriptions(key) {
    const json = JSON.parse(
      await Drive.get("middleware/HitDescriptions.json", "utf8")
    );
    return json[key];
  }

  ignoreUrl() {
    return ["auth-login"];
  }

  async handle({ request, response }, next) {
    await next();
    // const token = request.header("Authorization")
    //   ? request.header("Authorization").replace("Bearer ", "")
    //   : null;

    const hit = new Hit();
    const uuid = v4();
    const url = request.originalUrl();
    const body = response.lazyBody.content;
    const [requestModule, requestMethod] = url
      .split("/")
      .filter(Boolean)
      .filter((url, idx) => idx == 2 || idx == 3)
      .map((m) => m.split("?")[0]);
    // const session =
    //   !Hits.ignoreUrl().includes(
    //     `${requestModule}-${requestMethod}`.toLowerCase()
    //   ) &&
    //   token !== null &&
    //   (await AuthService.checkToken(token))
    //     ? await AuthService.getSessionRaw(token)
    //     : null;

    hit.merge({
      transaction_id: uuid,
      username: "", //session ? session.username : "",
      ip: request.ip(),
      url,
      module: requestModule ? sentenceCase(requestModule).toUpperCase() : "",
      method: requestMethod ? sentenceCase(requestMethod).toUpperCase() : "",
      description:
        requestMethod && requestModule
          ? await this.getDescriptions(
              `${requestModule}-${requestMethod}`.toLowerCase()
            )
          : "",
      status: response.response.statusCode,
    });

    await hit.save();

    Logger.transport("hits").info({
      timestamp: moment().format("MMMM D, YYYY - h:mm:ss A"),
      referenceId: uuid,
      request: request.all(),
      response: body,
      url,
      method: request.method(),
      headers: request.headers(),
    });

    if (typeof body == "object") response.send({ ...body, txId: uuid });
  }
}

module.exports = Hits;
