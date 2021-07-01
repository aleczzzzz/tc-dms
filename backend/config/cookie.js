const ms = use("ms");

module.exports = {
  properties: {
    httpOnly: true,
    sameSite: true,
    maxAge: ms("1h"),
    path: "/",
  },
};
