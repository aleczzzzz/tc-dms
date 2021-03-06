import Vue from "vue";

const { Vuelidate } = require("vuelidate");
Vue.use(Vuelidate);

const Paginate = require("vuejs-paginate");
Vue.component("Paginate", Paginate);

export default async function({ store }) {
  await store.dispatch("auth/getSession");

  window.onNuxtReady(() => {
    window.$nuxt.$loading.start();

    setTimeout(() => {
      window.$nuxt.$loading.finish();
    }, 500);
  });
}
