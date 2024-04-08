import "./commands";

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const username = Cypress.env("username");
  const password = Cypress.env("password");
  const baseUrl = Cypress.env('baseUrl');
  if (baseUrl) {
    cy.visit(baseUrl, '/login', {timeout: 20000});
    cy.reload();
    cy.loginRP(username, password);
    cy.url().then(url => {
      const getUrl = url
      cy.task('log','Current URL is : '+ getUrl)
  });
  } else {
    throw new Error("URL is not defined");
  }
});
before(() => {
});

afterEach(() => {});

after(() => {
});