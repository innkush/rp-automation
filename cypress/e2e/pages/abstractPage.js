class AbstractPage {

  static buttons;

  static clickOnButton(button) {
    cy.get(this.buttons[button]).should('be.visible').click();
  }

}

export default AbstractPage;
