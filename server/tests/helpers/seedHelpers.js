import bcrypt from 'bcrypt-nodejs';
import { Logger } from 'logger';
import faker from 'faker';
import model from '../../models';

/**
 * Helper class to prepopulate the database
 */
class seedHelper {

  static initialize() {
    model.sequelize.sync({ force: true })
      .then(() => {
        seedHelper.initialRoles()
          .then(() => {
            seedHelper.populateUsers();
          })
          .then(() => {
            seedHelper.populateDocs();
          })
          .catch((err) => {
            Logger.error(err);
          });
      });
  }

  /**
   * Populate users table with initial users
   */
  static populateUsers() {
    const defaultUsers = [
      {
        firstName: 'Oyinda',
        lastName: 'Subair',
        email: 'oyinda@gmail.com',
        password: seedHelper.hashPassword('oyinda123'),
        roleId: 1
      },
      {
        firstName: 'Rotimi',
        lastName: 'Babalola',
        email: 'rotimi@gmail.com',
        password: seedHelper.hashPassword('rotimi123'),
        roleId: 2
      }
    ];
    return model.User.bulkCreate(defaultUsers);
  }

  /**
   * Populate documents table with initial users
   */
  static populateDocs() {
    const defaultDocs = [
      {
        userId: 1,
        title: faker.lorem.word(),
        docContent: faker.lorem.sentence(3),
        access: 'public'
      },
      {
        userId: 2,
        title: faker.lorem.word(),
        docContent: faker.lorem.sentence(3),
        access: 'private'
      },
      {
        userId: 1,
        title: faker.lorem.word(),
        docContent: faker.lorem.sentence(3),
        access: 'public'
      }
    ];
    return model.Document.bulkCreate(defaultDocs);
  }

  /**
   * Returns a new role object
   */
  static initialRoles() {
    const defaultRoles = [
      {
        title: 'SuperAdmin'
      },
      {
        title: 'Admin'
      },
      {
        title: 'User'
      },
      {
        title: 'Guest'
      }
    ];
    return model.Role.bulkCreate(defaultRoles);
  }

  /**
   * Method to hash a password
   *
   * @param {String} - password
   * @returns {String} - hashedPassword
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}

export default seedHelper.initialize();
