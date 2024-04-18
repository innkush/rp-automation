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
  }

  static fields = {
    INPUT: (text) =>  `input[placeholder='${text}']`,
  }

  static messages = {
    MODAL_MESSAGE: 'p[class*=\'filterDeleteModal\']'
  }

  static verifyLinkContainsText(link, text) {
    cy.get('footer').scrollIntoView();
    cy.get(this.links[link]).contains(text);
  }

  static verifyDemoDataIsVisible(link, text) {
    cy.get(this.links[link]).contains(text)
  }

  static clickOnFilter(button, text) {
    const element = cy.get(this.buttons[button]).contains(text);
    element.click();
  }

  static addMoreCondition(button) {
    const element = cy.get(this.buttons[button]).contains('More');
    element.click();
  }

  static selectCondition(button, condition) {
    const element =  cy.get(this.buttons[button]).contains(condition);
    element.click();
  }

  static verifyFieldFilterVisibility(label, text) {
    const element =  cy.get(this.labels[label]).contains(text);
    element.should('be.visible');
  }

  static getField(text) {
    this.fields.INPUT(text);
  }

  static setValueIntoInputField(textInput, value) {
    const field = this.fields.INPUT(textInput);
    if( textInput === 'Enter filter name') {
      const number =  Math.floor(Math.random() * 1000); 
      value = value + number;
    }
    
    cy.get(field)
      .should('be.visible')
      .clear()
      .type(value)
  }

  static addNewFilter(){
    const button = this.buttons.BIG_BUTTON;
    const element = cy.get(button).contains('Add');
    element.click();
  }

  static verifyFilterVisibility(filterName) {
    const filter = this.labels.FILTER_NAME;
    const element = cy.get(filter).contains(filterName);
    element.should('be.visible');
    cy.wait(2000);
  }

  static deleteFilter(){
    const button = this.buttons.BIG_BUTTON;
    const element = cy.get(button).contains('Delete');
    element.click();
  }

  static scrollIntoView(label) {
    cy.get(this.labels[label]).scrollIntoView();
  }

  static verifyConfirmationMessageVisible(message) {
    cy.get(this.messages[message]).should('be.visible')
  }
}

export default FilterPage;
