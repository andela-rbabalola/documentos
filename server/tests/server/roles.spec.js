import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;

const testUser = testHelper.user();
let superAdminDetails;
let adminDetails;
let regularDetails;

describe('Roles Test Suite', () => {
  before((done) => {
    server.post('/users/signin')
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        superAdminDetails = res.body;
        server.post('/users/signin')
          .type('form')
          .send({ email: 'rotimi@gmail.com', password: 'rotimi123' })
          .end((err, res) => {
            adminDetails = res.body;
            server.post('/users')
              .type('form')
              .send(testUser)
              .end((err, res) => {
                regularDetails = res.body;
                done();
              });
          });
      });
  });

  describe('Create Role', () => {
    const newRole = testHelper.defaultRole();
    it('Should ensure SuperAdmin can create a role', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(newRole)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.newRole.title).to.equal(newRole.title);
          done();
        });
    });

    it('Should ensure non SuperAdmin can not create a role', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': adminDetails.token })
        .send(newRole)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should ensure regular users can not create a role', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': adminDetails.token })
        .send(newRole)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Ensure role titles should be unique', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(newRole)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(`Role ${newRole.title} already exists`);
          done();
        });
    });
  });

  describe('Get roles', () => {
    it('Should return all roles to the SuperAdmin', (done) => {
      server.get('/roles')
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].title).to.equal('SuperAdmin');
          expect(res.body[1].title).to.equal('Admin');
          expect(res.body[2].title).to.equal('User');
          expect(res.body[3].title).to.equal('Guest');
          // fix this
          // expect(res.body[4].title).to.equal('new role');
          done();
        });
    });

    it('Should not return all roles to an Admin', (done) => {
      server.get('/roles')
        .set({ 'x-access-token': adminDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should not return all roles to a regular user', (done) => {
      server.get('/roles')
        .set({ 'x-access-token': regularDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should return a specific role to the SuperAdmin', (done) => {
      server.get('/roles/1')
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(res.body.title).to.equal('SuperAdmin');
          expect(res.body.id).to.equal(1);
          done();
        });
    });

    it('Should not return a specific role to an Admin', (done) => {
      server.get('/roles/1')
        .set({ 'x-access-token': adminDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should fail if role does not exist', (done) => {
      server.get('/roles/100')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Role with id 100 not found');
          done();
        });
    });
  });

  describe('Update role', () => {
    it('Should allow the SuperAdmin to edit a role', (done) => {
      server.put('/roles/3')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ title: 'updated role' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Role 3 successfully updated');
          done();
        });
    });

    it('Should not allow an admin to update a role', (done) => {
      server.put('/roles/3')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: 'updated role' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should not allow a regular user to update a role', (done) => {
      server.put('/roles/3')
        .set({ 'x-access-token': regularDetails.token })
        .send({ title: 'updated role' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should fail if role does not exist', (done) => {
      server.put('/roles/100')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ title: 'new updated role' })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('Unable to update because role 100 is not found');
          done();
        });
    });

    it('Should fail if role title already exists', (done) => {
      server.put('/roles/2')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ title: 'Admin' })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.equal('Role titles must be unique');
          done();
        });
    });

    it('Should ensure SuperAdmin role can\'t be updated', (done) => {
      server.put('/roles/1')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ title: 'New SuperAdmin' })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('SuperAdmin role can not be updated');
          done();
        });
    });
  });

  // avoid hard coding role id for guest here
  describe('Delete Role', () => {
    it('Should allow only the SuperAdmin to delete a role', (done) => {
      server.delete('/roles/4')
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('Role successfully deleted');
          done();
        });
    });

    it('Should not allow an admin to delete a role', (done) => {
      server.delete('/roles/5')
        .set({ 'x-access-token': adminDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should fail if role does not exist', (done) => {
      server.delete('/roles/100')
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('Unable to delete because role is not found');
          done();
        });
    });

    it('Should ensure SuperAdmin role cannot be deleted', (done) => {
      server.delete('/roles/1')
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('SuperAdmin role can not be deleted');
          done();
        });
    });
  });
});
