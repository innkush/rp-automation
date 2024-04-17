const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 12000,
  pageLoadTimeout: 60000,
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: "m6prnv",
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    debug: true,
    videoOnFailOnly: true,
  },

  env: {
    baseUrl: 'http://127.0.0.1:8080',
    coverage: false,
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/e2e/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/code-coverage/task')(on, config);
      require('@cypress/grep/src/plugin')(config);
      on('task', {
        log(message) {
          console.log(message);
          return null; 
        },
      });
      return config;
    }
  }
});