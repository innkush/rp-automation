const { Given, When, Then } = require('@wdio/cucumber-framework');

const { expect, browser, $ } = require('@wdio/globals');
require('dotenv').config();
const username = process.env.WDIO_USERNAME;
const password = process.env.WDIO_PWD;
const baseUrl = process.env.BASE_URL;

const FilterPage = require('../pageobjects/filter.page');

const HomePage = require('../pageobjects/home.page');
import { logger } from '../../logger';

let generatedNumber;

Then(
  'I see the {string} link contains the {string} text',
  async (name, text) => {
    const footer = await $('footer');
    footer.waitForDisplayed();
    const linkElement = await FilterPage.getElement(
      'link',
      name,
      undefined,
      true
    );
    const actualTexts = [];
    for (const element of linkElement) {
      const text = await element.getText();
      actualTexts.push(text);
    }
    const expectedValue = text + ' ' + generatedNumber;
    expect(actualTexts).toContain(expectedValue);
  }
);

Given('I am on the Home page', async () => {
  const currentUrl = await browser.getUrl();
  expect(currentUrl).toHaveText([expect.stringContaining('/dashboard')]);
});

Then('I see demo data {string} is in the launches list', async (expectedValue) => {
  const linkElement = await FilterPage.getElement(
    'link',
    'DEMO_DATA',
    '',
    true
  );
  const actualTexts = [];
  for (const element of linkElement) {
    const text = await element.getText();
    actualTexts.push(text);

    expect(actualTexts).toContain(expectedValue);
  }
});

When('I click on the {string} button', async (button) => {
  const element = await FilterPage.getElement('button', button);
  element.click();
});

When('I click on the sidebar filter button', async () => {
  const element = await HomePage.getElement('button', 'SIDE_BAR_FILTER');
  await element.click();
});

When('I see {int} number of filtered launches', (expectedQuantities) => {
  expect(expectedQuantities).toBeLessThanOrEqual(50);
  expect(expectedQuantities).toBeGreaterThanOrEqual(2);
});

When('I click on the more condition button', async () => {
  const element = await FilterPage.getElement('button', 'MORE');
  element.click();
});

When(
  'I select {string} condition from the dropdown menu',
  async (condition) => {
    const element = await FilterPage.getElement(
      'dynamic',
      'MORE_CONDITION',
      condition
    );
    await element.scrollIntoView();
    await element.waitForDisplayed({ timeout: 5000 });
    await element.waitForClickable({ timeout: 5000 });
    await element.click();
  }
);

Then(
  'I see filter label {string} has a value {string}',
  async (label, text) => {
    const elements = await FilterPage.getElement(
      'label',
      label,
      undefined,
      true
    );
    const texts = [];

    for (const element of elements) {
      const text = await element.getText();
      texts.push(text);
    }

    const isValuePresent = texts.includes(text);
    expect(isValuePresent).toBe(true);
  }
);

When(
  'I enter {string} into the {string} input field',
  async (textInput, field) => {
    const element = await FilterPage.getElement('field', 'INPUT', field);
    if (field === 'Enter filter name') {
      const number = Math.floor(Math.random() * 1000);
      generatedNumber = number;
      textInput = textInput + ' ' + number;
    }

    await element.waitForDisplayed();
    await element.clearValue();
    await element.addValue(textInput);
  }
);

When(/I confirm the (adding|deletion) of a filter/, async (action) => {
  let element;
  switch (action) {
    case 'adding':
      {
        element = await FilterPage.getElement('dynamic', 'BIG_BUTTON', 'Add');
      }
      break;
    case 'deletion':
      {
        element = await FilterPage.getElement(
          'dynamic',
          'BIG_BUTTON',
          'Delete'
        );
      }
      break;

    default:
      throw new Error('Wrong action specified');
  }

  await element.click();
  await element.waitForDisplayed({reverse: true, timeout: 30000});
});

Then(
  'I see the filter {string} appears in the filter list',
  async (filterName) => {
    const filter = await FilterPage.getElement(
      'label',
      'FILTER_NAME',
      filterName
    );
    expect(filter).toBeDisplayedInViewport();
  }
);

Then('I see the filter is no longer visible in the filter list', async () => {
  const filter = await FilterPage.getElement('label', 'FILTER_NAME');
  expect(filter).not.toBeDisplayedInViewport();
});

When('I scroll into view of {string}', async (label) => {
  (await FilterPage.getElement('label', label)).scrollIntoView();
});

Then('I see a confirmation message on the deletion filter', async () => {
  const element = await FilterPage.getElement('message', 'MODAL_MESSAGE');
  expect(element).toBeDisplayedInViewport();
});

Given('I login to RP', async () => {
  const url = `${baseUrl}`;
  await browser.url(url);
  logger.info('Full url:' + url);
  try {
    const usernameInput = await HomePage.getElement('label', 'USERNAME');
    await usernameInput.waitForDisplayed();
    await usernameInput.setValue(username);
    const pwd = await HomePage.getElement('label', 'PWD');
    pwd.waitForDisplayed();
    await pwd.setValue(password);
    const submit = await HomePage.getElement('button', 'SUBMIT');
    await submit.click();
    const sidebarTopBlock = await HomePage.getElement(
      'button',
      'SIDE_BAR_FILTER'
    );
    expect(sidebarTopBlock).toBeDisplayed();
  } catch (error) {
    throw new Error('Failed to login', error.message);
  }
});

When('I wait for an overlay element disappear', async () => {
  const message = await HomePage.getElement('button', 'BOTTOM_NOTIFICATION');
  message.waitForDisplayed();
  message.waitForDisplayed({ reverse: true, timeout: 30000 });
});

When('I logout RP', async () => {
  const sidebar = await HomePage.getElement('button', 'SIDE_BAR_BOTTOM');
  sidebar.click();
  const logout = await HomePage.getElement('button', 'LOGOUT');
  logout.waitForDisplayed();
  logout.click();
  logout.waitForDisplayed({ reverse: true, timeout: 5000 });
});

Then(
  'I see all active filters in the filter list with the correct options:',
  async (dataTable) => {
    const expectedFilters = dataTable.hashes();
    for (let index = 0; index < expectedFilters.length; index++) {
      const filter = expectedFilters[index];

      const row = await FilterPage.getRowElementByIndex(index);
      logger.info(`Row at index ${index}: ${JSON.stringify(row)}`);
      if (!row || typeof row.$ !== 'function') {
        throw new Error(
          `Row element at index ${index} is not valid: ${JSON.stringify(row)}`
        );
      }

      const cells = await row.$$(FilterPage.labels['cells']);

      const cellPromises = cells.slice(0, 4).map(async (cell) => {
        const text = await cell.getText();
        return text;
      });

      const cellTexts = await Promise.all(cellPromises);
      logger.info(
        `Cell texts in row at index ${index}: ${JSON.stringify(cellTexts)}`
      );

      expect(cellTexts[0].replace(/\d+/g, '').trim()).toBe(
        filter['Filter name']
      );
      expect(cellTexts[1].trim()).toBe(filter['Options']);
      expect(cellTexts[2].trim()).toBe(filter['Owner']);
    }
  }
);
