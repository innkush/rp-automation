class FilterPage {
  locators = {
    button: `[type="button"]`,
  };

  clickOn(selectorName) {
    cy.get(button).contains(selectorName).click();
  }
}

export default new FilterPage();
