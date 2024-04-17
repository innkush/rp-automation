Cypress.Commands.add("loginRP", (username, password) => {
  cy.get('input[placeholder=Login]').type(username);
  cy.get('input[placeholder=Password]').type(password);
  cy.get('[type=submit]').click();
  cy.get(`div[class*='sidebar__top-block']`).should('be.visible');
});

export {};