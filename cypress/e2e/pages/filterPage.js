class HomePage {
  locators = {
    filterButton: "#filter",
  };

  clickOnFilter() {
    cy.get(this.locators.filterButton).click();
  }
}

export const HomePage = new HomePage();
