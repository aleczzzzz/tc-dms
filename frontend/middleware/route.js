import { capitalCase } from "capital-case";

export default function({ route, store, redirect, $config }) {
  const isLogged = store.state.auth.session !== null;
  console.log(route);
  if (route.matched.length == 0) {
    redirect("/404");
    return;
  }

  const pageName = route.name.split("-")[route.matched.length - 1];
  document.title = `${$config.name} | ${capitalCase(pageName)}`;

  if (route.name == "404") return;

  route.path.toLowerCase() == "/" &&
    redirect(isLogged ? "/Dashboard" : "/Login");
  route.name != "Login" && !isLogged && redirect("/Login");
  route.name == "Login" && isLogged && redirect("/Dashboard");

  if (isLogged) {
    const module = route.meta[0].module;
    const modules = store.state.auth.session.modules.map((m) => m);

    module && !modules.includes(module) && redirect("/404");
  }
}
