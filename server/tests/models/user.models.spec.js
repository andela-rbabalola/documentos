/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import model from '../../models';
import testHelper from '../helpers/testHelpers';

const expect = chai.expect;
const testUser = testHelper.user();
const userNoFirstName = testHelper.userNoFirstName();
const userNoLastName = testHelper.userNoLastName();
const userNoEmail = testHelper.userNoEmail();
const userNoPassword = testHelper.userNoPassword();

describe('Users Model', () => {
  describe('Create User', () => {
    let user;

    before((done) => {
      model.User.create(testUser)
        .then((createdUser) => {
          user = createdUser;
          done();
        });
    });

    // after(() => model.User.destroy({ where: { id: user.id } }));

    after((done) => {
      model.User.destroy({ where: { id: user.id } });
      done();
    });

    it('Should be able to create a new user', () => {
      expect(user).to.exist;
      expect(typeof user).to.equal('object');
    });

    it('Should have a created user with name and email', () => {
      expect(user.firstName).to.equal(testUser.firstName);
      expect(user.lastName).to.equal(testUser.lastName);
      expect(user.email).to.equal(testUser.email);
    });

    it('Should create a user with a hashed password', () => {
      expect(user.password).to.not.equal(testUser.password);
      expect(user.password.length).to.not.equal(testUser.password.length);
    });

    it('Should create a user with a defined role', (done) => {
      model.User.findById(user.id, {
        include: model.Role
      }).then((foundUser) => {
        expect(foundUser.Role.title).to.equal('User');
        done();
      });
    });
  });
});

describe('User Validation', () => {
  it('requires first name field to create a user', (done) => {
    model.User.create(userNoFirstName)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });

  it('requires last name field to create a user', (done) => {
    model.User.create(userNoLastName)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });

  it('requires email field to create a user', (done) => {
    model.User.create(userNoEmail)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });

  it('ensures a user can only be created once(unique)', (done) => {
    model.User.create(testUser)
      .then(() => {
        model.User.create(testUser)
          .catch((error) => {
            expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
            done();
          });
      });
  });
});

describe('Password Validation', () => {
  const passwordUser = testHelper.user();
  let user;
  before((done) => {
    model.User.create(passwordUser)
      .then((createdUser) => {
        user = createdUser;
        done();
      });
  });

  it('Should ensure that a valid password is verified', () => {
    model.User.findById(user.id)
      .then((foundUser) => {
        expect(foundUser.verifyPassword(passwordUser.password)).to.be.true;
      });
  });

  it('Should ensure password cannot be empty', (done) => {
    model.User.create(userNoPassword)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
});
