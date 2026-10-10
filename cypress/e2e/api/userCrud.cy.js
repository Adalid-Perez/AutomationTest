import UserApi from '../../pages/api/UserApi';
import { buildUser, buildUserUpdate } from '../../support/dataGenerator';

describe('PetStore API - User CRUD', () => {
  const userApi = new UserApi();
  let user;
  let updatedUser;

  before(() => {
    user = buildUser();
    updatedUser = {
      ...user,
      ...buildUserUpdate(),
    };
  });

  it('Creates a user', () => {
    userApi.create(user).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.code).to.eq(200);
      expect(response.body.message).to.eq(String(user.id));
      cy.log(`User created: ${user.username}`);
    });
  });

  it('Finds the created user', () => {
    userApi.get(user.username).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq(user.username);
      expect(response.body.email).to.eq(user.email);
      cy.log(`User found: ${response.body.username}`);
    });
  });

  it('Updates the user name and email', () => {
    userApi.update(user.username, updatedUser).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`User updated -> name: ${updatedUser.firstName} ${updatedUser.lastName}, email: ${updatedUser.email}`);
    });
  });

  it('Finds the updated user', () => {
    userApi.get(user.username).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstName).to.eq(updatedUser.firstName);
      expect(response.body.lastName).to.eq(updatedUser.lastName);
      expect(response.body.email).to.eq(updatedUser.email);
      cy.log(`Updated data: ${response.body.firstName} / ${response.body.email}`);
    });
  });

  it('Deletes the updated user and verifies it no longer exists', () => {
    userApi.remove(updatedUser.username).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`User deleted -> ${updatedUser.firstName} ${updatedUser.lastName} (${updatedUser.username})`);
    });

    userApi.get(updatedUser.username).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
