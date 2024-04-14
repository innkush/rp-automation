import FilterPage from "../pages/filterPage";
import HomePage from "../pages/homePage";


describe("UI test #2", () => {
  it.only("Modify Filter", () => {
    HomePage.clickOnButton("SIDE_BAR_FILTER");
    FilterPage.clickOnButton("ADD_FILTER");
    FilterPage.verifyDemoDataIsVisible("DEMO_DATA", "Demo Api Tests");
    FilterPage.addMoreCondition("MORE");
    FilterPage.selectCondition("MORE", "Product Bug Group");
    FilterPage.scrollIntoView("TOOLBAR");
    FilterPage.verifyFieldFilterVisibility("FIELD_FILTER", "Product Bug Group");
    FilterPage.setValueIntoInputField("Enter name", "Demo Api");
    FilterPage.setValueIntoInputField("Enter quantity", 2);
    FilterPage.clickOnButton("SAVE");
    FilterPage.setValueIntoInputField("Enter filter name", "New filter for prod bug");
    FilterPage.addNewFilter();
    FilterPage.verifyLinkContainsText("FILTER_NAME", "New filter for prod bug")
  });
});
