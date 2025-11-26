const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://demoqa.com",
    supportFile: "cypress/support/e2e.js",
    retries: {
      runMode: 2,
      openMode: 0
    },
    async setupNodeEvents(on, config) {
      const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
      const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
      const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
      const allureWriter = require("@shelex/cypress-allure-plugin/writer");

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      allureWriter(on, config);

      return config;
    }
  },
});
