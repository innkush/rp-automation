import { Before, After } from 'cypress-cucumber-preprocessor/steps';

Before({ tags: '@delete and @modify' }, function () {
  cy.log('Placeholder for before hook for specific tests');
});

After(function () {
  cy.log('Placeholder for cleaning up the database after all tests');
  cy.exec('npm run db:teardown', { failOnNonZeroExit: false })
    .then(result => {
      if (result.code !== 0) {
        cy.log('Failed to run db:teardown:', result.stderr);
      }
    });
});
