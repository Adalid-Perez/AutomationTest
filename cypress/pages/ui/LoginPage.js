/**
 * Page Object for the SauceDemo login page.
 */
class LoginPage {
  elements = {
    /**
     * Gets the username input field.
     * @returns {Cypress.Chainable} the username input element.
     */
    usernameInput: () => cy.get('[data-test="username"]'),
    /**
     * Gets the password input field.
     * @returns {Cypress.Chainable} the password input element.
     */
    passwordInput: () => cy.get('[data-test="password"]'),
    /**
     * Gets the login button.
     * @returns {Cypress.Chainable} the login button element.
     */
    loginButton: () => cy.get('[data-test="login-button"]'),
    /**
     * Gets the login error message element.
     * @returns {Cypress.Chainable} the error message element.
     */
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  /**
   * Opens the login page.
   * @returns {LoginPage} the current page object for chaining.
   */
  visit() {
    cy.visit('/');
    return this;
  }

  /**
   * Types the username into the username field.
   * @param {string} username the username to type.
   * @returns {LoginPage} the current page object for chaining.
   */
  typeUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  /**
   * Types the password into the password field.
   * @param {string} password the password to type.
   * @returns {LoginPage} the current page object for chaining.
   */
  typePassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  /**
   * Clicks the login button.
   * @returns {LoginPage} the current page object for chaining.
   */
  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }

  /**
   * Logs in with the provided credentials.
   * @param {string} username the username to log in with.
   * @param {string} password the password to log in with.
   * @returns {LoginPage} the current page object for chaining.
   */
  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  /**
   * Gets the login error message element.
   * @returns {Cypress.Chainable} the error message element.
   */
  getErrorMessage() {
    return this.elements.errorMessage();
  }
}

export default LoginPage;
