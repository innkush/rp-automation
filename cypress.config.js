const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 12000,
  pageLoadTimeout: 60000,
  viewportWidth: 1280,
  viewportHeight: 720,
  projectId: '1i9eio',
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    debug: true,
  },
  env: {
    coverage: false,
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',

  auth: {
    username: 'superadmin',
    password: 'erebus',
  }, 

  e2e: {
    baseUrl: 'http://127.0.0.1:8080/ui/#/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/e2e/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/code-coverage/task')(on, config);
      require('@cypress/grep/src/plugin')(config);
      on('before:browser:launch', (browser, launchOptions) => {
        console.log('before launching browser')
        console.log(browser)

        if (browser.name === 'chrome') {
          // https://www.ghacks.net/2013/10/06/list-useful-google-chrome-command-line-switches/

          launchOptions.args.push('--window-size=1920,1080')

          console.log('chrome launch args:')

          return launchOptions
        }
      })

      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config
    }
  }
});
