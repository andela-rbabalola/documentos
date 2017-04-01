import faker from 'faker';

/**
 * Helper class to populate database
 */
class testHelper {
  /**
   * Creates a dummy users
   * @returns {obj} - Object with dummy user details
   */
  static user() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123'
    };
  }

  /**
   * Returns a dummy users without a role
   * @returns {obj} - Object with dummy user details
   */
  static userWithoutRole() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  }

  /**
   * Returns a dummy users with a role
   * @returns {obj} - Object with dummy user details
   */
  static userWithRole(roleId) {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'anotherpassword',
      roleId
    };
  }

  static userNoFirstName() {
    return {
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'fakepassword',
    };
  }

  static userNoLastName() {
    return {
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      password: 'faker.internet.password()',
    };
  }

  static userNoEmail() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: 'anewday123',
    };
  }

  static userNoPassword() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    };
  }

  /**
   * Creates a dummy document
   * @returns {obj} - Object with dummy user details
   */
  static dummyDocument(userId) {
    return {
      title: faker.lorem.word(),
      docContent: faker.lorem.paragraph(),
      access: 'public',
      userId
    };
  }

  /**
   * Creates a dummy document without permission specified
   * @returns {obj} - Object with dummy user details
   */
  static dummyDocumentNoPermission() {
    return {
      title: faker.lorem.word(),
      docContent: faker.lorem.paragraph(),
      userId: 2
    };
  }

  /**
   * Creates a dummy document given arguments
   * @param {String} access - string specifying access type for doc
   * @param {Integer} userId - Integer specifying owner of document
   * @returns {obj} - Object with dummy user details
   */
  static dummyDocumentWithArg(access, userId) {
    return {
      title: faker.lorem.word(),
      docContent: faker.lorem.paragraph(),
      access,
      userId
    };
  }

  static defaultRole() {
    return {
      title: 'new role'
    };
  }

  static anotherRole() {
    return {
      title: 'test role'
    };
  }
}

export default testHelper;
