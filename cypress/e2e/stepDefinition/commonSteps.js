import { Then, And, When } from 'cypress-cucumber-preprocessor/steps';
import FilterPage from '../pages/filterPage';
import HomePage from '../pages/homePage';

Then('user verifies {string} link contains {string} text', (link, text) => {
  cy.get('footer').scrollIntoView();
  cy.get(FilterPage.links[link]).contains(text);
});

Then('user verifies demo data {string} is visible', (text) => {
  cy.get(FilterPage.links['DEMO_DATA']).contains(text);
});

When('user clicks on {string} button', (button) => {
  const element = cy.get(FilterPage.buttons[button]);
  element.click();
});

When('user clicks on side bar filter button', () => {
  const element = cy.get(HomePage.buttons['SIDE_BAR_FILTER']);
  element.click();
});

And('user see {int} number of filtered launches', (expectedQuantities) => {
  expect(expectedQuantities).within(2, 50);
});

Then('user clicks on more condition button', () => {
  const element = cy.get(FilterPage.buttons['MORE']).contains('More');
  element.click();
});

And('user selects {string} condition', (condition) => {
  const element = cy.get(FilterPage.buttons['MORE']).contains(condition);
  element.click();
});

Then(
  'user verifies filter label {string} has a value {string}',
  (label, text) => {
    const element = cy.get(FilterPage.labels[label]).contains(text);
    element.should('be.visible');
  }
);

And(
  'user sets value {string} into {string} input field',
  (textInput, field) => {
    const element = FilterPage.fields.INPUT(field);
    if (field === 'Enter filter name') {
      const number = Math.floor(Math.random() * 1000);
      textInput = textInput + ' ' + number;
    }

    cy.get(element).should('be.visible').clear().type(textInput);
    cy.wait(5000);
  }
);


And(/user (adds|deletes) new filter/, (action) => {
  const button = FilterPage.buttons.BIG_BUTTON;
  let element;
  switch (action) {
  case 'adds':
    {
      element = cy.get(button).contains('Add');
    }
    break;
  case 'deletes':
    {
      element = cy.get(button).contains('Delete');
    }
    break;

  default:
    throw new Error('Wrong action specified');
  }

  element.click();
});

Then('user verifies filter {string} is visible', (filterName) => {
  const filter = FilterPage.labels.FILTER_NAME;
  const element = cy.get(filter).contains(filterName);
  element.should('be.visible');
  cy.wait(2000);
});

And('user scrolls into view of {string}', (label) => {
  cy.get(FilterPage.labels[label]).scrollIntoView();
});

Then('user verifies confirmation message is visible', () => {
  cy.get(FilterPage.messages['MODAL_MESSAGE']).should('be.visible');
});


Then('user sees all active filters:', dataTable => {
  const expectedFilters = dataTable.hashes();

  expectedFilters.forEach((filter, index) => {
    cy.get(`${FilterPage.labels['rows']}:nth-child(${index + 1})`).then($row => {
      cy.wrap($row).find(FilterPage.labels['cells']).eq(0).invoke('text').then(text => {
        expect(text.trim()).to.include(filter['Filter name']);
      });
      cy.wrap($row).find(FilterPage.labels['cells']).eq(1).invoke('text').then(text => {
        expect(text.trim()).to.equal(filter['Options']);
      });
      cy.wrap($row).find(FilterPage.labels['cells']).eq(2).invoke('text').then(text => {
        expect(text.trim()).to.equal(filter['Owner']);
      });
      cy.wrap($row).find(FilterPage.labels['cells']).eq(3).invoke('text').then(text => {
        expect(text.trim()).to.equal(filter['Display on launches']);
      });
    });
  });
});
