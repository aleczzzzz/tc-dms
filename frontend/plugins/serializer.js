export default (ctx, inject) => {
  const cleanResponse = (res) => {
    return {
      ...(typeof res?.data == "object" ? res?.data : { ...res?.data }),
      status: res.status,
    };
  };

  const formatMessages = (message) => {
    return typeof message != "string"
      ? message.map((m) => `* <b>${m}</b>`).join("<br>")
      : `* <b>${message}</b>`;
  };

  const serializerFn = {
    cleanResponse,
    formatMessages,
  };

  inject("serializer", serializerFn);
};
