/**
 * Page Object for the SauceDemo checkout page.
 */
class CheckoutPage {
  elements = {
    /**
     * Gets the first name input field.
     * @returns {Cypress.Chainable} the first name input element.
     */
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    /**
     * Gets the last name input field.
     * @returns {Cypress.Chainable} the last name input element.
     */
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    /**
     * Gets the postal code input field.
     * @returns {Cypress.Chainable} the postal code input element.
     */
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    /**
     * Gets the continue button.
     * @returns {Cypress.Chainable} the continue button element.
     */
    continueButton: () => cy.get('[data-test="continue"]'),
    /**
     * Gets the finish button.
     * @returns {Cypress.Chainable} the finish button element.
     */
    finishButton: () => cy.get('[data-test="finish"]'),
    /**
     * Gets the order summary total label.
     * @returns {Cypress.Chainable} the order summary total element.
     */
    summaryTotal: () => cy.get('[data-test="total-label"]'),
  };

  /**
   * Fills the checkout information form with the customer data.
   * @param {object} customer the customer information.
   * @param {string} customer.firstName the customer first name.
   * @param {string} customer.lastName the customer last name.
   * @param {string} customer.postalCode the customer postal code.
   * @returns {CheckoutPage} the current page object for chaining.
   */
  fillInformation(customer) {
    this.elements.firstNameInput().clear().type(customer.firstName);
    this.elements.lastNameInput().clear().type(customer.lastName);
    this.elements.postalCodeInput().clear().type(customer.postalCode);
    return this;
  }

  /**
   * Continues to the order overview.
   * @returns {CheckoutPage} the current page object for chaining.
   */
  continue() {
    this.elements.continueButton().click();
    return this;
  }

  /**
   * Finishes the purchase.
   * @returns {CheckoutPage} the current page object for chaining.
   */
  finish() {
    this.elements.finishButton().click();
    return this;
  }

  /**
   * Asserts that the order overview is displayed.
   * @returns {CheckoutPage} the current page object for chaining.
   */
  assertOnOverview() {
    this.elements.summaryTotal().should('be.visible');
    return this;
  }
}

export default CheckoutPage;
