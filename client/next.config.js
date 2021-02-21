const nextTranslate = require("next-translate");
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 500;
    return config;
  },
  ...nextTranslate(),
  images: {
    domains: ["gravatar.com"],
  },
};
