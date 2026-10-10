/**
 * Page Object for the SauceDemo shopping cart page.
 */
class CartPage {
  elements = {
    /**
     * Gets the page title element.
     * @returns {Cypress.Chainable} the page title element.
     */
    title: () => cy.get('[data-test="title"]'),
    /**
     * Gets all the cart item elements.
     * @returns {Cypress.Chainable} the cart item elements.
     */
    cartItems: () => cy.get('[data-test="inventory-item"]'),
    /**
     * Gets all the cart item name elements.
     * @returns {Cypress.Chainable} the cart item name elements.
     */
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    /**
     * Gets all the cart item price elements.
     * @returns {Cypress.Chainable} the cart item price elements.
     */
    itemPrices: () => cy.get('[data-test="inventory-item-price"]'),
    /**
     * Gets the checkout button.
     * @returns {Cypress.Chainable} the checkout button element.
     */
    checkoutButton: () => cy.get('[data-test="checkout"]'),
  };

  /**
   * Asserts that the cart page is displayed.
   * @returns {CartPage} the current page object for chaining.
   */
  assertOnPage() {
    this.elements.title().should('contain.text', 'Your Cart');
    return this;
  }

  /**
   * Asserts the number of products displayed in the cart.
   * @param {number} count the expected number of products.
   * @returns {CartPage} the current page object for chaining.
   */
  assertProductCount(count) {
    this.elements.cartItems().should('have.length', count);
    return this;
  }

  /**
   * Asserts that a product is present in the cart.
   * @param {string} productName the product display name.
   * @returns {CartPage} the current page object for chaining.
   */
  assertProductPresent(productName) {
    this.elements.itemNames().should('contain.text', productName);
    return this;
  }

  /**
   * Proceeds to the checkout form.
   * @returns {CartPage} the current page object for chaining.
   */
  checkout() {
    this.elements.checkoutButton().click();
    return this;
  }
}

export default CartPage;
