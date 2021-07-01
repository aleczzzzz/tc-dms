const { hooks } = use("@adonisjs/ignitor");
const { ioc } = use("@adonisjs/fold");

hooks.after.providersBooted(() => {
  const Validator = use("Validator");
  const SanitizorHooks = use("App/Validators/Custom/Sanitizor");
  const ValidatorHooks = use("App/Validators/Custom/Validator");

  for (const key in ValidatorHooks) {
    Validator.extend(key, ValidatorHooks[key]);
  }

  for (const key in SanitizorHooks) {
    Validator.sanitizor[key] = SanitizorHooks[key];
  }
});
