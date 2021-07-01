"use strict";
const { isTokenValid, getUserInstance, getSession } = use(
  "App/Controllers/Service/AuthService"
);

class Auth {
  async handle(ctx, next) {
    const token = ctx.request.cookie("token");

    if (token && (await isTokenValid(token))) {
      const user = await getUserInstance(token);
      ctx.$session = await getSession(user, token);
      ctx.user = user;
      await next();
    } else
      return ctx.response
        .status(401)
        .json({ message: "Unauthenticated user." });
  }
}

module.exports = Auth;
