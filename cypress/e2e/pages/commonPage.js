import HomePage from "./homePage";
import FilterPage from "./homePage";

const pages = {
  HomePage: HomePage,
  FilterPage: FilterPage,
};

class CommonPage {
  static buttons;

  static clickOnButton(page, element) {
    console.log("buttons:", page.buttons);
    return pages[page].clickOnButton(element);
  }

}

export default CommonPage;
