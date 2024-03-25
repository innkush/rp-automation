// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'; 

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const { username, password } = Cypress.config('auth');
  const url = Cypress.env("_env");
  cy.loginRP(username, password, url);
});
before(() => {
  // runs once before all tests in the block
})

afterEach(() => {
  // runs after each test in the block
})

after(() => {
  // runs once after all tests in the block
})


