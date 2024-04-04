import "./commands";
require("dotenv").config();
const { exec } = require('child_process');

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const { username, password } = Cypress.config('auth');
  const baseUrl = Cypress.env('baseUrl');

  if (baseUrl) {
    cy.visit(baseUrl, '/login', {timeout: 20000});
    cy.reload();
    cy.loginRP(username, password);
  } else {
    throw new Error("URL is not defined");
  }
});
before(() => {
});

afterEach(() => {});

after(() => {
  
});
