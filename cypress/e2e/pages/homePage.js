class FilterPage {
    locators = {
      addFilter: "#filter",
    };
  
    clickOnAddFilter() {
      cy.get(this.locators.addFilter).click();
    }
  }
  
  export const FilterPage = new FilterPage();
  