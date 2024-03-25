const { HomePage } = require("../pages/filterPage");

describe("UI test", () => {
  it("should log in rp", () => {
    cy.debug("first test");
    HomePage.clickOnFilter()
  });
});
