import FilterPage from "../pages/filterPage";
import HomePage from "../pages/homePage";


describe("UI test #1", () => {
  it("Add Filter", () => {
    HomePage.clickOnButton("SIDE_BAR_FILTER");
    FilterPage.clickOnButton("ADD_FILTER");
    FilterPage.verifyDemoDataIsVisible("DEMO_DATA", "Demo Api Tests");
  });
});

