import faker from 'faker';

class testHelper {
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
      title: 'user'
    };
  }
}

export default testHelper;
