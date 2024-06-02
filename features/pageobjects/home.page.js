const { $ } = require('@wdio/globals')

const WebElementPage = require('./webElementPage');

class HomePage extends WebElementPage {
  static labels = {
    USERNAME: 'input[placeholder="Login"]',
    PWD: 'input[placeholder="Password"]',
    
  };
  static buttons = {
    SIDE_BAR_FILTER: 'a[href*="/filters"]', 
    LAUNCHES: 'div[class*="launchSuiteGrid"] > div[class*="itemInfo__item-info"]',
    SUBMIT: '[type="submit"]',
    SIDE_BAR_BOTTOM: 'div[class*=sidebar__bottom]',
    BOTTOM_NOTIFICATION: 'div[class*=\'notificationItem__message\']',
    LOGOUT: '//div[contains(@class, "userBlock")][contains(text(), "Logout")]'
  };

  
  static async getElement(elementType, elementName) {
    let selector;
    switch (elementType) {
      case 'button':
        selector = await HomePage.buttons[elementName];
        break;
      case 'label':
        selector = await HomePage.labels[elementName];
        break;
      default:
        throw new Error(`Unsupported element type: ${elementType}`);
    }

    return $(selector);
  }
}
  
module.exports = HomePage;
