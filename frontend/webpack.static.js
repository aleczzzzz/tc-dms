const path = require("path");
const MergeIntoSingleFilePlugin = require("webpack-merge-and-include-globally");
const { minify } = require("terser");
const CleanCSS = require("clean-css");
const RemovePlugin = require("remove-files-webpack-plugin");

const scripts = [
  "assets/vendor/jquery/dist/jquery.min.js",
  "assets/js/popper.min.js",
  "assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js",
  "assets/vendor/js-cookie/js.cookie.js",
  "assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js",
  "assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js",
  "assets/js/jquery-confirm.min.js",
  "assets/js/datepicker.min.js",
  "assets/js/i18n/datepicker.en.js",
  "assets/js/bootstrap-select.min.js",
  "assets/js/template.js",
];

const styles = [
  "assets/css/font.css",
  "assets/css/fontawesome.css",
  "assets/css/material.css",
  "assets/css/jquery-confirm.min.css",
  "assets/css/datepicker.min.css",
  "assets/css/bootstrap-select.min.css",
  "assets/css/template.css",
  "assets/css/404.css",
];
const staticPath = path.resolve(__dirname, "static");

module.exports = {
  entry: "./package.json",
  output: {
    filename: "[name]",
    path: staticPath,
  },
  plugins: [
    new MergeIntoSingleFilePlugin({
      files: {
        "js/bundle.js": scripts.map((script) => {
          return path.resolve(__dirname, script);
        }),
        "css/assets.css": styles.map((style) => {
          return path.resolve(__dirname, style);
        }),
      },
      transform: {
        "js/bundle.js": async (code) => {
          const mini = await minify(code);

          return mini.code;
        },
        "css/assets.css": async (style) =>
          new CleanCSS({}).minify(style).styles,
      },
      transformFileName: (filename, extension, hash) => {
        const folder = filename.split("/")[0];

        return `${folder}/${hash}.${extension}`;
      },
    }),
    new RemovePlugin({
      before: {
        root: staticPath,
        include: ["js", "css"],
      },
      after: {
        root: staticPath,
        include: ["main"],
      },
    }),
  ],
};
