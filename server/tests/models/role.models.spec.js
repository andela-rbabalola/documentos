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

    after((done) => {
      model.Role.destroy({ where: { id: role.id } });
      done();
    });

    it('Should be able to create a new role', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });

    it('Should create a role that has a title', () => {
      expect(role.title).to.equal(defaultRole.title);
    });

    describe('Role Model Validations', () => {
      it('Should ensure that the title field cannot be null', (done) => {
        model.Role.create()
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
      });

      it('Should ensure a role title is unique', () => {
        model.Role.create(defaultRole)
          .then(() => {
          })
          .catch((error) => {
            expect(/UniqueConstraintError/.test(error.name)).to.be.true;
          });
      });
    });
  });//
});
