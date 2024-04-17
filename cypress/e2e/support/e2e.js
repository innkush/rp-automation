import "./commands";

beforeEach(() => {
  console.log("Before Each Hook Executing");
  const username = Cypress.env("RP_USERNAME");
  const password = Cypress.env("RP_PASSWORD");
  const baseUrl = Cypress.env("baseUrl");
  if (baseUrl) {
    cy.visit(baseUrl, "/login", { timeout: 20000 });
    cy.reload();
    cy.loginRP(username, password);
    cy.url().then((url) => {
      const getUrl = url;
      cy.task("log", "Current URL is : " + getUrl);
    });
  } else {
    throw new Error("URL is not defined");
  }
});

before(() => {
  const username = Cypress.env("RP_USERNAME");
  const password = Cypress.env("RP_PASSWORD");

  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8080/uat/sso/oauth/token",
    body: `grant_type=password&username=${username}&password=${password}`,
    headers: {
      accept: "application/json, text/plain, */*",
      authorization: "Basic dWk6dWltYW4=",
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
    const accessToken = resp.body.access_token;
    cy.request({
      method: "POST",
      url: "http://127.0.0.1:8080/api/v1/demo/superadmin_personal/generate",
      body: "{}",
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: `bearer ${accessToken}`,
        "content-type": "application/json",
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property("launchIds");
    });
  });
});

afterEach(() => {
  cy.log("Closing browser window");
  cy.window().then((win) => {
    win.close();
  });
});

after(() => {
  cy.log("Clear cache after suite");
  cy.clearLocalStorage();
  cy.clearCookies();
});
