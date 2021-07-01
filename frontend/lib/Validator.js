const { helpers } = require("vuelidate/lib/validators");
const { noCase } = require("change-case");

const errorMessages = {
  required: "This field is required.",
  minLength: "This field must be at least ${length} characters",
  maxLength: "This field must not be more than ${length} characters",
  regex: "This field's value is invalid",
  email: "This field's email format is invalid",
  inInt: "Please select an option",
  sameAs: "This field must be the same as ${field}",
  numeric: "This field's value must be numbers",
};

const getErrorMessage = (model) => {
  const error = Object.keys(model.$params)
    .map((key) => key)
    .filter((key) => !model[key])[0];

  let message;

  if (["minLength", "maxLength"].includes(error)) {
    const length = model.$params[error][error == "minLength" ? "min" : "max"];

    message = eval("`" + errorMessages[error] + "`");
  } else if (error == "sameAs") {
    const field = noCase(model.$params[error].eq);

    message = eval("`" + errorMessages[error] + "`");
  } else message = errorMessages[error];

  return message;
};

const validators = {
  regex: (rgx) => helpers.regex("regex", rgx),
  inInt: (rack, value) => rack.includes(+value),
};

module.exports = {
  getErrorMessage,
  validators,
};
