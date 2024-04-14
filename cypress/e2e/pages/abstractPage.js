class AbstractPage {

static buttons;

  static clickOnButton(button) {
    cy.log("Clicking on element:", button);
    return cy.get(this.buttons[button]).should("be.visible").click();
  }

}

export default AbstractPage;
