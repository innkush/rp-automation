class FilterPage {
  locators = {
    filterButton: "#filter",
  };

  clickOnFilter() {
    cy.get(this.locators.filterButton).click();
  }
}

export default new FilterPage();
