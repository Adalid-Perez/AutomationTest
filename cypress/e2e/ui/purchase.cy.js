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
    loginPage.visit();
  });

  it('Completes a successful purchase until the confirmation', () => {
    cy.env(['uiCredentials']).then(({ uiCredentials }) => {
      loginPage.login(uiCredentials.standard.username, uiCredentials.standard.password);
    });
    inventoryPage.assertOnPage();

    products.forEach((product) => inventoryPage.addProductToCart(product));
    inventoryPage.getCartBadge().should('have.text', '2');

    inventoryPage.openCart();
    cartPage.assertOnPage().assertProductCount(products.length);
    products.forEach((product) => cartPage.assertProductPresent(product));

    cartPage.checkout();
    checkoutPage.fillInformation(buildCheckoutCustomer()).continue();

    checkoutPage.assertOnOverview().finish();

    checkoutCompletePage.assertOrderCompleted();
  });

  it('Shows an error when logging in with a locked out user', () => {
    cy.env(['uiCredentials']).then(({ uiCredentials }) => {
      loginPage.login(uiCredentials.lockedOut.username, uiCredentials.lockedOut.password);
    });

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });
});
