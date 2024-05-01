import { Before, After } from 'cypress-cucumber-preprocessor/steps';

Before({ tags: '@delete' }, function () {
  cy.log('Placeholder for before hook for specific tests');

  const username = Cypress.env('RP_USERNAME');
  const password = Cypress.env('RP_PASSWORD');
  const baseUrl = Cypress.env('baseUrl');

  cy.request({
    method: 'POST',
    url: baseUrl + '/uat/sso/oauth/token',
    body: `grant_type=password&username=${username}&password=${password}`,
    headers: {
      accept: 'application/json, text/plain, */*',
      authorization: 'Basic dWk6dWltYW4=',
      'content-type': 'application/x-www-form-urlencoded',
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
    const accessToken = resp.body.access_token;
    const number = Math.floor(Math.random() * 1000);
    cy.request({
      method: 'POST',
      url: baseUrl + '/api/v1/superadmin_personal/filter/',
      body: `{"conditions":[{"value":"New Filter To Delete","condition":"cnt","filteringField":"name"}],"type":"launch","orders":[{"isAsc":false,"sortingColumn":"startTime"},{"isAsc":false,"sortingColumn":"number"}],"name":"New Filter To Delete ${number}","owner":"superadmin"}`,
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `bearer ${accessToken}`,
        'content-type': 'application/json',
      },
    })
      .then((resp) => {
        expect(resp.status).to.eq(201);
        expect(resp.body).to.have.property('id');
      })
      .then((resp) => {
        cy.request({
          method: 'PUT',
          url:
            baseUrl +
            '/api/v1/project/superadmin_personal/preference/superadmin/' +
            resp.body.id,
          body: null,
          headers: {
            accept: 'application/json, text/plain, */*',
            authorization: `bearer ${accessToken}`,
            'content-type': 'application/json',
          },
        }).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body).to.have.property('message');
        });
      });
  });
});

After(function () {
  cy.log('Placeholder for cleaning up the database after all tests');
  cy.exec('npm run db:teardown', { failOnNonZeroExit: false }).then(
    (result) => {
      if (result.code !== 0) {
        cy.log('Failed to run db:teardown:', result.stderr);
      }
    }
  );
});
