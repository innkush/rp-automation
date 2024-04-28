import AbstractPage from './abstractPage';

class FilterPage extends AbstractPage {
  static buttons = {
    ADD_FILTER: 'div[class*=\'filterPageToolbar\'] > button[type="button"]',
    DEMO_FILTER: 'span[class*="filterItem__name"]',
    MORE: 'div[class*="entitiesSelector"]',
    SAVE: 'button[title=\'Save\']',
    BIG_BUTTON: 'button[class*=\'bigButton\']',
    DELETE: 'div[class*=deleteFilterButton]',
  
  };

  static links = {
    DEMO_DATA: 'a[class*=\'itemInfo__name-link\']',
    FILTER_NAME: 'span[class*=\'filterItem__name\']',
  };

  static checkboxes = {
    CONDITION: 'span[class*=\'inputCheckbox\']',
  }

  static labels = {
    FIELD_FILTER: 'span[class*=\'fieldFilterEntity__entity\']',
    TOOLBAR: 'div[class*="launchFiltersToolbar__launch-filters-toolbar"]',
    FILTER_NAME: 'a[class*=\'filterName__name-link\']',
    cells: 'div[class*=\'gridCell__grid-cell\']',
    rows: 'div[class*=\'gridRow__change-mobile\']',
  }

  static fields = {
    INPUT: (text) =>  `input[placeholder='${text}']`,
  }

  static messages = {
    MODAL_MESSAGE: 'p[class*=\'filterDeleteModal\']'
  }
}

export default FilterPage;
