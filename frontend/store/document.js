import { to } from "await-to-js";

export const actions = {
  async save(ctx, payload) {
    const [err, data] = await to(this.$axios.post("/document/save", payload));

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    return $data;
  },
};
