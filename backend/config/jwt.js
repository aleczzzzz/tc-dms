const Env = use("Env");

module.exports = {
  algorithm: "HS256",
  secret: Env.get("APP_KEY"),
  expiresIn: "1h",
};
