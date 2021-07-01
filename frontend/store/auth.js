import { to } from "await-to-js";

export const state = () => ({
  session: null,
});

export const mutations = {
  setSession(state, session) {
    state.session = session;
  },
};

export const getters = {
  getSession: (state) => state.session,
};

export const actions = {
  async logIn({ commit }, payload) {
    const [err, data] = await to(this.$axios.post("/auth/logIn", payload));

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    $data.status == 200 && commit("setSession", $data.data);
    this.$router.push("/");

    return $data;
  },

  async getSession({ commit }) {
    const [err, data] = await to(this.$axios.get("/auth/getSession"));

    const { status, data: body } = this.$serializer.cleanResponse(
      err ? err.response : data
    );

    status == 200 && commit("setSession", body);
  },

  async reconnect({ commit }) {
    const [err, data] = await to(this.$axios.get("/auth/reconnect"));

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    $data.status == 200 && commit("setSession", $data.data);

    return data;
  },

  async logOut({ commit }) {
    await to(this.$axios.get("/auth/logOut"));

    commit("setSession", null);
    this.$router.push("/");
  },
};
