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
      password: faker.internet.password(),
      roleId: 2
    };
  }

  static defaultRole() {
    return {
      title: 'guest'
    };
  }
}

export default testHelper;
