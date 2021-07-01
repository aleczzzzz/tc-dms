import { capitalCase } from "capital-case";

export default function({ route, store, redirect, $config }) {
  const isLogged = store.state.auth.session !== null;

  if (route.matched.length == 0) {
    redirect("/404");
    return;
  }

  const pageName = route.name.split("-")[route.matched.length - 1];
  document.title = `${$config.name} | ${capitalCase(pageName)}`;

  if (route.path == "/404") return;

  route.path.toLowerCase() == "/" &&
    redirect(isLogged ? "/Dashboard" : "/Login");
  route.path.toLowerCase() != "/login" && !isLogged && redirect("/Login");
  route.path.toLowerCase() == "/login" && isLogged && redirect("/Dashboard");

  if (isLogged) {
    const module = route.meta[0].module;
    const modules = store.state.auth.session.modules.map((m) => m);

    module && !modules.includes(module) && redirect("/404");
  }
}
