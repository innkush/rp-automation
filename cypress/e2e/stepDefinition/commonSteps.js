import { Then, And, When, Given } from 'cypress-cucumber-preprocessor/steps';
import FilterPage from '../pages/filterPage';
import HomePage from '../pages/homePage';

Then('I see the {string} link contains the {string} text', (link, text) => {
  cy.get('footer').scrollIntoView();
  cy.get(FilterPage.links[link]).contains(text);
});

Given('I am on the Home page', () => {
  cy.url().should('include', '/dashboard')
});

Then('I see demo data {string} is in the launches list', (text) => {
  cy.get(FilterPage.links['DEMO_DATA']).contains(text);
});

When('I click on the {string} button', (button) => {
  const element = cy.get(FilterPage.buttons[button]);
  element.click();
});

When('I click on the sidebar filter button', () => {
  const element = cy.get(HomePage.buttons['SIDE_BAR_FILTER']);
  element.click();
});

And('I see {int} number of filtered launches', (expectedQuantities) => {
  expect(expectedQuantities).within(2, 50);
});

Then('I click on the more condition button', () => {
  const element = cy.get(FilterPage.buttons['MORE']).contains('More');
  element.click();
});

And('I select {string} condition from the dropdown menu', (condition) => {
  const element = cy.get(FilterPage.buttons['MORE']).contains(condition);
  element.click();
});

Then(
  'I see filter label {string} has a value {string}',
  (label, text) => {
    const element = cy.get(FilterPage.labels[label]).contains(text);
    element.should('be.visible');
  }
);

And(
  'I enter {string} into the {string} input field',
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


And(/I confirm the (adding|deletion) of a filter/, (action) => {
  const button = FilterPage.buttons.BIG_BUTTON;
  let element;
  switch (action) {
  case 'adding':
    {
      element = cy.get(button).contains('Add');
    }
    break;
  case 'deletion':
    {
      element = cy.get(button).contains('Delete');
    }
    break;

  default:
    throw new Error('Wrong action specified');
  }

  element.click();
});

Then('I see the filter {string} appears in the filter list', (filterName) => {
  const filter = FilterPage.labels.FILTER_NAME;
  const element = cy.get(filter).contains(filterName);
  element.should('be.visible');
  cy.wait(2000);
});

Then('I see the filter is no longer visible in the filter list', () => {
  const element = cy.get(FilterPage.labels.FILTER_NAME);
  element.should('not.exist');
  cy.wait(2000);
});

And('I scroll into view of {string}', (label) => {
  cy.get(FilterPage.labels[label]).scrollIntoView();
});

Then('I see a confirmation message on the deletion filter', () => {
  cy.get(FilterPage.messages['MODAL_MESSAGE']).should('be.visible');
});


Then('I see all active filters in the filter list with the correct options:', dataTable => {
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
