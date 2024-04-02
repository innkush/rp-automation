import "./commands";
require("dotenv").config();
const { exec } = require('child_process');

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const { username, password } = Cypress.config('auth');
  const baseUrl = Cypress.env('baseUrl')
  if (baseUrl) {
    cy.visit(baseUrl, { timeout: 4000 });
    cy.loginRP(username, password);
  } else {
    throw new Error("URL is not defined");
  }
});
before(() => {
  // const path = 'gnome-terminal -- bash -c "cd reportportal && docker-compose up"';
 
  // exec(path, (error) => {
  //   if (error) {
  //     console.log(`${error.message}`);
  //     done(error);
  //   }
  //   done();
  // });
});

afterEach(() => {});

after(() => {
  
});
