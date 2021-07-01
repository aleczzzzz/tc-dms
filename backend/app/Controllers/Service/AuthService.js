const Config = use("Config");
const { sign, decode, verify } = use("jsonwebtoken");
const Encryption = use("Encryption");
const User = use("App/Models/User");

class AuthService {
  static async generateToken(user) {
    const { secret, expiresIn } = Config.get("jwt");

    const token = sign(
      { user: Encryption.encrypt(JSON.stringify(user)) },
      secret,
      { expiresIn }
    );

    return token;
  }

  static async getSession(userCollection, token) {
    const { exp } = decode(token);

    const role = await userCollection.role().setVisible(["id", "role"]).fetch();
    const modules = await role
      .modules()
      .where({
        status: 1,
        platform: "frontend",
      })
      .fetch();

    return {
      user: userCollection.toJSON(),
      role: role.toJSON(),
      modules: modules.toJSON().map(({ module_code }) => module_code),
      token_expires_at: exp,
    };
  }

  static async isTokenValid(token) {
    const { secret } = Config.get("jwt");
    let tk;

    try {
      tk = verify(token, secret);
    } catch {
      tk = null;
    }

    return tk !== null ? true : false;
  }

  static async getUserInstance(token) {
    const { user: _user } = decode(token);
    const { id } = JSON.parse(Encryption.decrypt(_user));

    return await User.find(id);
  }
}

module.exports = AuthService;
