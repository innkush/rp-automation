import AbstractPage from './abstractPage';

class HomePage extends AbstractPage {
  static buttons = {
    SIDE_BAR_FILTER: 'a[href*="/filters"]',  
  };
}
  
export default HomePage;
