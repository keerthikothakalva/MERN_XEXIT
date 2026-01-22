"use strict";

var _require = require("cypress"),
    defineConfig = _require.defineConfig;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    specPattern: "cypress/integration/**/*.js",
    supportFile: "cypress/support/index.js"
  }
});
//# sourceMappingURL=cypress.config.dev.js.map
