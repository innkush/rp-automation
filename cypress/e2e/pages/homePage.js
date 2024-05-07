import AbstractPage from './abstractPage';

class HomePage extends AbstractPage {
  static buttons = {
    SIDE_BAR_FILTER: 'a[href*="/filters"]', 
    LAUNCHES: 'div[class*="launchSuiteGrid"] > div[class*="itemInfo__item-info"]'
  };
}
  
export default HomePage;
