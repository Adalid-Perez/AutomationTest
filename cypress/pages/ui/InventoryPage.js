import { productSelectors } from '../../support/catalog';

/**
 * Page Object for the SauceDemo inventory (products) page.
 */
class InventoryPage {
  elements = {
    /**
     * Gets the page title element.
     * @returns {Cypress.Chainable} the page title element.
     */
    title: () => cy.get('[data-test="title"]'),
    /**
     * Gets the shopping cart badge element.
     * @returns {Cypress.Chainable} the shopping cart badge element.
     */
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    /**
     * Gets the shopping cart link element.
     * @returns {Cypress.Chainable} the shopping cart link element.
     */
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
  };

  /**
   * Asserts that the inventory page is displayed.
   * @returns {InventoryPage} the current page object for chaining.
   */
  assertOnPage() {
    this.elements.title().should('contain.text', 'Products');
    return this;
  }

  /**
   * Adds a product to the shopping cart by its display name.
   * @param {string} productName the product display name.
   * @returns {InventoryPage} the current page object for chaining.
   */
  addProductToCart(productName) {
    const selector = productSelectors[productName];
    if (!selector) {
      throw new Error(`Product not mapped: ${productName}`);
    }
    cy.get(selector).click();
    return this;
  }

  /**
   * Gets the shopping cart badge element.
   * @returns {Cypress.Chainable} the shopping cart badge element.
   */
  getCartBadge() {
    return this.elements.cartBadge();
  }

  /**
   * Opens the shopping cart page.
   * @returns {InventoryPage} the current page object for chaining.
   */
  openCart() {
    this.elements.cartLink().click();
    return this;
  }
}

export default InventoryPage;
