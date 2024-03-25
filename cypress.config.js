const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '1i9eio',
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    debug: true,
  },
  env: {
    coverage: false
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',

  auth: {
    username: 'superadmin',
    password: 'erebus',
  }, 

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/e2e/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/code-coverage/task')(on, config);
      require('@cypress/grep/src/plugin')(config);
      return config
    }
  }
});
