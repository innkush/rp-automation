class HomePage {
    locators = {
      addFilter: "#filter",
    };
  
    clickOnAddFilter() {
      cy.get(this.locators.addFilter).click();
    }
  }
  
  export default HomePage();