import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;

let adminDetails;
let regularDetails;


describe('Roles Test Suite', () => {
  before((done) => {
    server.post('/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        adminDetails = res.body;
        server.post('/users')
          .send(testHelper.user())
          .end((err, res) => {
            regularDetails = res.body;
            done();
          });
      });
  });

  describe('Ensure admin can create a new role', () => {
    const newRole = testHelper.defaultRole();
    it('Ensures admin can create a role', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': adminDetails.token })
        .send(newRole)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.newRole.title).to.equal(newRole.title);
          done();
        });
    });

    it('Ensure role titles should be unique', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': adminDetails.token })
        .send(newRole)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(`Role ${newRole.title} already exists`);
          done();
        });
    });

    it('Should ensure non-admin is unable to create a role', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': regularDetails.token })
        .send(newRole)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Only admins have access to this route');
          done();
        });
    });

    // A hack I know
    // Test for this in your model
    // it('Should fail if a title is null', (done) => {
    //   server.post('/roles')
    //     .set({ 'x-access-token': adminDetails.token })
    //     .send({ title: null })
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       expect(400);
    //       expect(res.body.message).to.equal('Title cannot be null');
    //       done();
    //     });
    // });
  });

  describe('Get roles', () => {
    it('Should return all roles to the admin', (done) => {
      server.get('/roles')
        .set({ 'x-access-token': adminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].title).to.equal('Admin');
          expect(res.body[1].title).to.equal('User');
          expect(res.body[2].title).to.equal('guest');
          done();
        });
    });

    it('Should not return all roles to a non admin', (done) => {
      server.get('/roles')
        .set({ 'x-access-token': regularDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Only admins have access to this route');
          done();
        });
    });

    it('Should return a specific role to an admin', (done) => {
      server.get('/roles/1')
        .set({ 'x-access-token': adminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.title).to.equal('Admin');
          expect(res.body.id).to.equal(1);
          done();
        });
    });

    it('Should fail if role does not exist', (done) => {
      server.get('/roles/100')
        .set({ 'x-access-token': adminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Role with id 100 not found');
          done();
        });
    });
  });

  describe('Update role', () => {
    it('Should allow admin to edit a role', (done) => {
      server.put('/roles/3')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: 'updated role' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('Role 3 successfully updated');
          done();
        });
    });

    it('Should not allow a non-admin to update a role', (done) => {
      server.put('/roles/3')
        .set({ 'x-access-token': regularDetails.token })
        .send({ title: 'updated role' })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Only admins have access to this route');
          done();
        });
    });

    it('Should fail if role does not exist', (done) => {
      server.put('/roles/100')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: 'new role' })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('Unable to update because role 100 is not found');
          done();
        });
    });

    it('Should fail if role title already exists', (done) => {
      server.put('/roles/2')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: 'Admin' })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.equal('Role titles must be unique');
          done();
        });
    });

    it('Should ensure admin role can\'t be updated', (done) => {
      server.put('/roles/1')
        .set({ 'x-access-token': adminDetails.token })
        .send({ title: 'New Admin' })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('Admin role can not be updated');
          done();
        });
    });
  });

  describe('Delete Role', () => {
    it('Should allow only admin to delete a role', (done) => {
      server.delete('/roles/3')
        .set({ 'x-access-token': adminDetails.token })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('Role successfully deleted');
          done();
        });
    });

    it('Should not allow non admin to delete a role', (done) => {
      server.delete('/roles/3')
        .set({ 'x-access-token': regularDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('Only admins have access to this route');
          done();
        });
    });

    it('Should fail if role does not exist', (done) => {
      server.delete('/roles/100')
        .set({ 'x-access-token': adminDetails.token })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('Unable to delete because role is not found');
          done();
        });
    });

    it('Should ensure admin role cannot be deleted', (done) => {
      server.delete('/roles/1')
        .set({ 'x-access-token': adminDetails.token })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('Admin role can not be deleted');
          done();
        });
    });
  });
});
