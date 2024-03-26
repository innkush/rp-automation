import './commands'; 
require('dotenv').config();

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const { username, password } = Cypress.config('auth');
  const url = 'http://127.0.0.1:8080'
  if (url) {
    cy.visit(url, {timeout: 4000});
    cy.loginRP(username, password);
  } else {
    throw new Error('BASE_URL is not defined');
  }
});
before(() => {

})

afterEach(() => {

})

after(() => {

})


