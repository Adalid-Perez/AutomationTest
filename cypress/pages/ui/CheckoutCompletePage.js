/**
 * Page Object for the SauceDemo order confirmation page.
 */
class CheckoutCompletePage {
  elements = {
    /**
     * Gets the confirmation header element.
     * @returns {Cypress.Chainable} the confirmation header element.
     */
    confirmationHeader: () => cy.get('[data-test="complete-header"]'),
  };

  /**
   * Asserts that the order was completed successfully.
   * @returns {CheckoutCompletePage} the current page object for chaining.
   */
  assertOrderCompleted() {
    this.elements.confirmationHeader()
      .should('be.visible')
      .and('contain.text', 'Thank you for your order');
    return this;
  }
}

export default CheckoutCompletePage;
