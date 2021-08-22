const path = require("path");
const glob = require("glob");
const [css, js] = glob.sync("**/*.{js,css}", {
  cwd: path.resolve(__dirname, "static"),
});

export default {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },

  ssr: false,

  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    name: process.env.NAME,
  },

  head: {
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    ],

    link: [
      { rel: "stylesheet", href: `/${css}` },
      { rel: "icon", type: "image/x-icon", href: "/img/csd-logo.png" },
    ],

    script: [{ src: `/${js}`, body: true }],
  },

  loading: "~/components/FullLoader.vue",

  generate: {
    dir: "public",
  },

  components: true,

  modules: ["@nuxtjs/axios"],

  plugins: [
    "~/plugins/serializer",
    "~/plugins/popover",
    "~/plugins/axios",
    "~/plugins/init",
  ],

  router: {
    middleware: "route",
  },

  axios: {
    baseURL: `${process.env.API_URL}`,
    progress: false,
    credentials: true,
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};
