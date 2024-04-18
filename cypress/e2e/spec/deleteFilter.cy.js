import FilterPage from '../pages/filterPage';
import HomePage from '../pages/homePage';

describe('UI test #2', () => {
  it('Delete Filter', () => {
    HomePage.clickOnButton('SIDE_BAR_FILTER');
    FilterPage.clickOnButton('ADD_FILTER');
    FilterPage.verifyDemoDataIsVisible('DEMO_DATA', 'Demo Api Tests');
    FilterPage.setValueIntoInputField('Enter name', 'New Filter To Delete');
    FilterPage.clickOnButton('SAVE');
    FilterPage.setValueIntoInputField('Enter filter name', 'New Filter To Delete');
    FilterPage.addNewFilter();
    FilterPage.verifyLinkContainsText('FILTER_NAME', 'New Filter To Delete')
    HomePage.clickOnButton('SIDE_BAR_FILTER');
    FilterPage.setValueIntoInputField('Search by name', 'New Filter To Delete');
    FilterPage.verifyFilterVisibility('New Filter To Delete');
    FilterPage.clickOnButton('DELETE');
    FilterPage.verifyConfirmationMessageVisible('MODAL_MESSAGE');
    FilterPage.deleteFilter();
  });
});
