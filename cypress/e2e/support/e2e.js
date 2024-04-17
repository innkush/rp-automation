import "./commands";

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const username = Cypress.env("RP_USERNAME");
  const password = Cypress.env("RP_PASSWORD");
  const baseUrl = Cypress.env("baseUrl");
  if (baseUrl) {
    cy.visit(baseUrl, "/login", { timeout: 20000 });
    cy.reload();
    cy.loginRP(username, password);
    cy.url().then((url) => {
      const getUrl = url;
      cy.task("log", "Current URL is : " + getUrl);
    });
  } else {
    throw new Error("URL is not defined");
  }
});
before(() => {});

afterEach(() => {
  cy.log("Closing browser window");
  cy.window().then((win) => {
    win.close();
  });
});

after(() => {
  cy.log("Clear cache after suite");
  cy.clearLocalStorage();
  cy.clearCookies();
});
