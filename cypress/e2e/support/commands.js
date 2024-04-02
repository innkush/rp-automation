// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginRP", (username, password) => {
  cy.url().then(url => {
    const getUrl = url
    cy.task('log','Current URL is : '+getUrl)
});
  cy.visit('http://127.0.0.1:8080/ui/#login', {timeout: 20000});
  cy.url().then(url => {
    const getUrl = url
    cy.task('log','Current URL is 2 : '+getUrl)
});
  cy.get('input[placeholder=Login]').type(username);
  cy.get('input[placeholder=Password]').type(password);
  cy.get('[type=submit]').click();
  cy.get(`div[class*='sidebar__top-block']`, { timeout: 4000 }).should('be.visible');
});

export {};
