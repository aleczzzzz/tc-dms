const glob = use("glob");
const path = use("path");

const validators = glob.sync("**/*.js", {
  cwd: path.resolve(__dirname),
  //   ignore: "**/_*.js",
});

const hooks = {};

validators
  .filter((validator) => validator != "index.js")
  .forEach((validator) => {
    const instance = use(`App/Validators/Custom/Validator/${validator}`);
    hooks[instance.name] = instance.fn;
  });

module.exports = hooks;
