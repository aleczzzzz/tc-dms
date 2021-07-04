import { to } from "await-to-js";

export const actions = {
  async save(ctx, payload) {
    const [err, data] = await to(this.$axios.post("/document/save", payload));

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    return $data;
  },

  async getDocumentKeys(ctx) {
    const [err, data] = await to(this.$axios.get("/document/getDocumentKeys"));

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    return $data;
  },

  async getDocuments(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post("/document/getDocuments", payload)
    );

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    return $data;
  },

  async getDocument(ctx, payload) {
    const [err, data] = await to(
      this.$axios.post("/document/getDocument", payload)
    );

    const $data = this.$serializer.cleanResponse(err ? err.response : data);

    return $data;
  },
};
