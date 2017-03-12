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
      password: faker.internet.password()
    };
  }

  /**
   * Creates a dummy users without a role
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
   * Creates a dummy document
   * @returns {obj} - Object with dummy user details
   */
  static dummyDocument() {
    return {
      title: faker.lorem.word(),
      docContent: faker.lorem.paragraph(),
      access: 'public',
      userId: 1
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
      userId: 1
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
}

export default testHelper;
