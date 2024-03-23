const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    debug: true,
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  specPattern: 'cypress/e2e/**/*.cy.js',
  e2e: {
    baseUrl: 'http://127.0.0.1:8080/ui/#login',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/code-coverage/task')(on, config);
      return config
    },
    supportFile: 'cypress/support/e2e.js'
  }
});
