========================================================
 AUTOMATION WITH CYPRESS - SAUCEDEMO (E2E) AND PETSTORE (API)
========================================================

Description
-----------
Automation test project built with Cypress.io in JavaScript.
It covers:
  - Option 2 (E2E): purchase flow on https://www.saucedemo.com/
  - Option 3 (APIs): user CRUD on https://petstore.swagger.io/
It applies the Page Object Model (POM), a lint setup with JSDoc and
generates HTML reports using cypress-mochawesome-reporter.

Requirements
------------
  - Node.js >= 18 (tested with Node 22)
  - npm

Installation
------------
1. Open a terminal in the project root.
2. Run:
     npm install

Running the tests
-----------------
  - Interactive mode (Cypress UI):
      npm test

  - Headless mode (all tests):
      npm run test:all

  - E2E tests only (SauceDemo):
      npm run test:ui

  - API tests only (PetStore):
      npm run test:api

Lint
----
  - Check style and errors:
      npm run lint

  - Auto-fix what is possible:
      npm run lint:fix

Credentials and configuration
-----------------------------
UI credentials are externalized in the cypress.env.json file at the project
root (auto-loaded by Cypress). Its schema is:

    {
      "uiCredentials": {
        "standard":  { "username": "standard_user",  "password": "<password>" },
        "lockedOut": { "username": "locked_out_user", "password": "<password>" }
      }
    }

In the specs they are read through cy.env() (Cypress 16 removed Cypress.env()).
cy.env() is asynchronous, so it is used as a command inside the test:

    cy.env(['uiCredentials']).then(({ uiCredentials }) => {
      loginPage.login(uiCredentials.standard.username, uiCredentials.standard.password);
    });

Because the file may contain secrets, add cypress.env.json to .gitignore and
optionally commit a cypress.env.example.json template with placeholder values.
The LoginPage object receives the credentials as parameters and does not read
the environment directly, keeping the Page Object decoupled from the config.

Reports
-------
Running in headless mode generates the HTML report at:
      cypress/reports/html/index.html

To open it from the terminal:
      npm run report

Failure screenshots are stored in cypress/screenshots and videos in cypress/reports/html/videos.

Project structure
-----------------
  cypress/
    e2e/
      ui/purchase.cy.js          E2E spec (SauceDemo)
      api/user-crud.cy.js        API spec (PetStore)
    pages/
      ui/                        UI Page Objects
      api/UserApi.js             REST service Page Object
    fixtures/                    Reserved (currently empty)
    support/                     Support config, data generator (builders) and product catalog
    reports/                     Generated reports
  cypress.config.js              Cypress configuration
  .eslintrc.json                 Lint configuration (classic format)

Covered scenarios
-----------------
E2E (SauceDemo):
  1. Log in with standard_user / secret_sauce.
  2. Add two products (Backpack and Bike Light) to the cart.
  3. View the cart.
  4. Complete the checkout form.
  5. Finish the purchase and validate "THANK YOU FOR YOUR ORDER".
  6. Negative case: log in with a locked out user (locked_out_user).

API (PetStore):
  1. Create a user.
  2. Find the created user.
  3. Update the user name and email.
  4. Find the updated user.
  5. Delete the updated user and verify it no longer exists.
