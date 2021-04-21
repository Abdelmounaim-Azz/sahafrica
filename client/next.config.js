const nextTranslate = require("next-translate");
module.exports = {
  distDir: "build",
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 500;
    return config;
  },
  ...nextTranslate(),
  images: {
    domains: ["gravatar.com"],
  },
};
