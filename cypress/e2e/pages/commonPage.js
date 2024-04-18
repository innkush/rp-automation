import HomePage from './homePage';
import FilterPage from './filterPage';

const pages = {
  HomePage: HomePage,
  FilterPage: FilterPage,
};

class CommonPage {
  static buttons;

  static clickOnButton(page, element) {
    pages[page].clickOnButton(element);
  }

}

export default CommonPage;
