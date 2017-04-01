/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import model from '../../models';
import testHelper from '../helpers/testHelpers';

const expect = chai.expect;
const defaultRole = testHelper.anotherRole();

describe('Role Model Test', () => {
  describe('Create Role', () => {
    let role;
    before((done) => {
      model.Role.create(defaultRole)
        .then((createdRole) => {
          role = createdRole;
          done();
        });
    });

    after(() => model.Role.destroy({ where: { id: role.id } }));

    it('Should be able to create a new role', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });

    it('Should create a role that has a title', () => {
      expect(role.title).to.equal(defaultRole.title);
    });
  });

  describe('Role Model Validations', () => {
    it('Should ensure that the title field cannot be null', (done) => {
      model.Role.create()
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.be.true;
          done();
        });
    });

    it('Should ensure a role title is unique', (done) => {
      model.Role.create(defaultRole)
        .then(() => {
          model.Role.create(defaultRole)
            .catch((error) => {
              expect(/SequelizeUniqueConstraintError/.test(error.name)).to.be.true;
              done();
            });
        });
    });
  });
});
