"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");
const Config = use("Config");

const { generateToken, getSession, getUserInstance } = use(
  "App/Controllers/Service/AuthService"
);

class AuthController {
  async logIn({ request, response }) {
    const { username, password } = request.all();

    const user = await User.findBy("username", username);

    if (!user)
      return response.status(404).send({ message: "Username not found." });

    if (!(await Hash.verify(password, user.password)))
      return response.status(400).send({ message: "Password is incorrect." });

    const token = await generateToken(user.toJSON());
    const body = await getSession(user, token, "frontend");

    response.cookie("token", token, this.cookieProperties);

    return response.status(200).send({
      message: "Successfully fetched users.",
      data: body,
    });
  }

  async getSession({ request, response }) {
    const token = request.cookie("token");
    const user = await getUserInstance(token);
    const data = await getSession(user, token, "frontend");
    return response.status(200).send({
      message: "Successfully fetched users.",
      data,
    });
  }

  async reconnect({ response, user }) {
    const token = await generateToken(user.toJSON());
    const body = await getSession(user, token, "frontend");

    response.cookie("token", token, this.cookieProperties);

    return response.status(200).send({
      message: "Successfully fetched users.",
      data: body,
    });
  }

  async logOut({ response }) {
    response.clearCookie("token");

    return response.status(200).send({ message: "Successfully logged out." });
  }

  get cookieProperties() {
    return Config.get("cookie").properties;
  }
}

module.exports = AuthController;
