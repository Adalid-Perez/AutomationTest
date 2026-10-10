const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultBrowser: 'chrome',
  expose: { apiUrl: 'https://petstore.swagger.io/v2' },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    charts: true,
    reportPageTitle: 'Reporte de Automatizacion - Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
    html: true,
    json: true,
  },
  video: true,
  videosFolder: 'cypress/reports/html/videos',
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    /**
     * Registers the Node events and plugins used during the Cypress run.
     * @param {object} on the Cypress event registration function.
     * @param {object} config the resolved Cypress configuration.
     * @returns {object} the modified Cypress configuration.
     */
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
