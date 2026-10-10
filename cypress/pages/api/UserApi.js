/**
 * API Page Object for the PetStore user endpoints.
 */
class UserApi {
  /**
   * Creates a user through the PetStore API.
   * @param {object} user the user payload to create.
   * @returns {Cypress.Chainable} the request response.
   */
  create(user) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.expose('apiUrl')}/user`,
      body: user,
      failOnStatusCode: false,
    });
  }

  /**
   * Gets a user by username through the PetStore API.
   * @param {string} username the username to look up.
   * @returns {Cypress.Chainable} the request response.
   */
  get(username) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.expose('apiUrl')}/user/${username}`,
      failOnStatusCode: false,
    });
  }

  /**
   * Updates a user by username through the PetStore API.
   * @param {string} username the username of the user to update.
   * @param {object} user the new user payload.
   * @returns {Cypress.Chainable} the request response.
   */
  update(username, user) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.expose('apiUrl')}/user/${username}`,
      body: user,
      failOnStatusCode: false,
    });
  }

  /**
   * Deletes a user by username through the PetStore API.
   * @param {string} username the username of the user to delete.
   * @returns {Cypress.Chainable} the request response.
   */
  remove(username) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.expose('apiUrl')}/user/${username}`,
      failOnStatusCode: false,
    });
  }
}

export default UserApi;
