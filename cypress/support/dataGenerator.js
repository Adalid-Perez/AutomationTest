import { faker } from '@faker-js/faker';

/**
 * Generates a random cell phone number.
 * @returns {string} a random cell phone number.
 */
export const generatePhone = () => {
  const firstNumber = faker.helpers.arrayElement([6, 7]);
  const complement = faker.number.int({ min: 1000000, max: 9999999 });
  return `${firstNumber}${complement}`;
};

/**
 * Generates a random user payload for the API tests.
 * @returns {object} an object with the generated user data.
 */
export const generateUser = () => {
  const unique = Date.now();
  const id = unique;
  const username = `${faker.person.firstName()}_${unique}`;
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  firstName = firstName.replace(/[^a-zA-Z ]/g, '');
  lastName = lastName.replace(/[^a-zA-Z ]/g, '');
  const password = faker.internet.password({ length: 10, memorable: true, pattern: /[A-Za-z0-9]/ });
  const userCellPhone = generatePhone();
  const userEmail = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  }).toLowerCase();
  const userStatus = 1;

  return {
    id,
    username,
    firstName,
    lastName,
    password,
    userCellPhone,
    userEmail,
    userStatus,
  };
};

/**
 * Builds a user payload ready to send to the PetStore API.
 * @param {object} overrides the fields to override in the generated user.
 * @returns {object} the user payload with the API field names.
 */
export const buildUser = (overrides = {}) => {
  const newUser = generateUser();
  return {
    id: newUser.id,
    username: newUser.username,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.userEmail,
    password: newUser.password,
    phone: newUser.userCellPhone,
    userStatus: newUser.userStatus,
    ...overrides,
  };
};

/**
 * Builds the updatable fields (name and email) with random data.
 * @returns {object} the fields to update in a user.
 */
export const buildUserUpdate = () => {
  const updateUser = generateUser();
  return {
    firstName: updateUser.firstName,
    lastName: updateUser.lastName,
    email: updateUser.userEmail,
  };
};

/**
 * Builds a customer payload for the checkout form with random data.
 * @returns {object} the customer information (firstName, lastName, postalCode).
 */
export const buildCheckoutCustomer = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
});
