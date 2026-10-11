import LoginPage from '../../pages/ui/LoginPage';
import InventoryPage from '../../pages/ui/InventoryPage';
import CartPage from '../../pages/ui/CartPage';
import CheckoutPage from '../../pages/ui/CheckoutPage';
import CheckoutCompletePage from '../../pages/ui/CheckoutCompletePage';
import { buildCheckoutCustomer } from '../../support/dataGenerator';

describe('SauceDemo - E2E purchase flow', () => {
  const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const checkoutCompletePage = new CheckoutCompletePage();

  beforeEach(() => {
    // Visit the SauceDemo login page before each test
    loginPage.visit();
  });

  it('Completes a successful purchase until the confirmation', () => {
    // Step 1: Log in with valid standard user credentials
    cy.env(['uiCredentials']).then(({ uiCredentials }) => {
      loginPage.login(uiCredentials.standard.username, uiCredentials.standard.password);
    });

    // Step 2: Verify the user is redirected to the Inventory page
    inventoryPage.assertOnPage();

    // Step 3: Add the selected products to the shopping cart
    products.forEach((product) => inventoryPage.addProductToCart(product));

    // Step 4: Verify the cart badge displays the correct number of items (2)
    inventoryPage.getCartBadge().should('have.text', '2');

    // Step 5: Open the shopping cart and verify it's displayed correctly
    inventoryPage.openCart();
    cartPage.assertOnPage().assertProductCount(products.length);

    // Step 6: Verify all selected products are present in the cart
    products.forEach((product) => cartPage.assertProductPresent(product));

    // Step 7: Proceed from the cart to the checkout information page
    cartPage.checkout();

    // Step 8: Fill in customer information and continue to the checkout overview
    checkoutPage.fillInformation(buildCheckoutCustomer()).continue();

    // Step 9: Verify the checkout overview page is displayed and complete the purchase
    checkoutPage.assertOnOverview().finish();

    // Step 10: Verify the order was completed successfully
    checkoutCompletePage.assertOrderCompleted();
  });

  it('Shows an error when logging in with a locked out user', () => {
    // Step 1: Attempt to log in using locked-out user credentials
    cy.env(['uiCredentials']).then(({ uiCredentials }) => {
      loginPage.login(uiCredentials.lockedOut.username, uiCredentials.lockedOut.password);
    });

    // Step 2: Verify the appropriate error message is displayed
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });
});
