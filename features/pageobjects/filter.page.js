
const WebElementPage = require('./webElementPage');
const { $$} = require('@wdio/globals')

class FilterPage extends WebElementPage {
  static buttons = {
    ADD_FILTER: 'div[class*=\'filterPageToolbar\'] > button[type="button"]',
    DEMO_FILTER: 'span[class*="filterItem__name"]',
    MORE: 'div[class*="entitiesSelector"]',
    SAVE: 'button[title=\'Save\']',
    BIG_BUTTON: 'button[class*=\'bigButton\']',
    DELETE: 'div[class*=deleteFilterButton]',
    
  };

  static dynamic = {
    MORE_CONDITION: (text) => `//span[contains(text(),'${text}')]/ancestor::label`,
    BIG_BUTTON: (text) => `//button[contains(@class, 'bigButton') and contains(text(), '${text}')]`,
    FILTER_NAME: (text) => `//span[contains(@class, 'filterItem__name') and contains(text(), '${text}')]`,
  };

  static links = {
    DEMO_DATA: 'a[class*=\'itemInfo__name-link\']',
    FILTER_NAME: '//span[contains(@class,"filterItem__name")]',
  };

  static checkboxes = {
    CONDITION: 'span[class*=\'inputCheckbox\']',
  };

  static labels = {
    FIELD_FILTER: 'span[class*=\'fieldFilterEntity__entity\']',
    TOOLBAR: 'div[class*="launchFiltersToolbar__launch-filters-toolbar"]',
    FILTER_NAME: 'a[class*=\'filterName__name-link\']',
    cells: 'div[class*=\'gridCell__grid-cell\']',
    rows: 'div[class*=\'gridRow__change-mobile\']',
  };

  static fields = {
    INPUT: (text) => `//input[@placeholder="${text}"]`,
  };

  static messages = {
    MODAL_MESSAGE: 'p[class*=\'filterDeleteModal\']',
  };

  static async getRowElementByIndex(index) {
    const rows = await FilterPage.getElement('label', 'rows', '', true);
    if (!rows || rows.length === 0) {
      throw new Error('No rows found');
    }

    return rows[index];
  }
  

  static async getElement(elementType, elementName, text, multiple = false) {
    let selector;
    switch (elementType) {
      case 'button':
        selector = await FilterPage.buttons[elementName];
        break;
      case 'link':
        selector = await FilterPage.links[elementName];
        break;
      case 'checkbox':
        selector = await FilterPage.checkboxes[elementName];
        break;
      case 'field':
        selector = await FilterPage.fields[elementName](text);
        break;
      case 'message':
        selector = await FilterPage.messages[elementName];
        break;
      case 'label':
        selector = await FilterPage.labels[elementName];
        break;
      case 'dynamic':
        selector = await FilterPage.dynamic[elementName](text);
        break;
      default:
        throw new Error(`Unsupported element type: ${elementType}`);
    }
    if (multiple ) {
      return $$(selector);
    }
  }
}

module.exports = FilterPage;
