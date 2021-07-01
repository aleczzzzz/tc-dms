let hook = {};

hook.fn = async (data, field, message, args, get) => {
  const value = get(data, field);
  const [expression] = args;

  if (!value) return;

  if (!new RegExp(expression, "i").test(value)) throw message;
};

hook.name = "matchRegex";

module.exports = hook;
