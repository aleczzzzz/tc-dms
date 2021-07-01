export default function({ $axios, $popover, store, redirect }) {
  $axios.onError((error) => {
    const code = +error?.response?.status || 0;
    const route = window?.$nuxt?.$route.name;

    if (code == 401 && route && route != "Login") {
      $popover.removeInstances();
      $popover.show(
        {
          title: "SESSION TIMEOUT",
          content: "Please re-log in.",
        },
        "warning"
      );
      store.dispatch("auth/logOut");
    }
  });
}
