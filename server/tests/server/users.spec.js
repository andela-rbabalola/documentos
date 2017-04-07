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

describe('Users Test Suite', () => {
  before((done) => {
    server.post('/api/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        superAdminDetails = res.body;
        server.post('/api/users/signin')
          .send({ email: 'rotimi@gmail.com', password: 'rotimi123' })
          .end((err, res) => {
            adminDetails = res.body;
            server.post('/api/users')
              .send(testHelper.user())
              .end((err, res) => {
                regularDetails = res.body;
                done();
              });
          });
      });
  });

  describe('Authentication', () => {
    const testAdmin = testHelper.userWithRole(2);
    it('Should create a user given valid details', (done) => {
      server.post('/api/users')
        .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
        .type('form')
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.newUser).to.have.property('firstName');
          expect(res.body.newUser).to.have.property('lastName');
          expect(res.body.newUser).to.have.property('email');
          expect(res.body.newUser).to.have.property('roleId');
          done();
        });
    });

    it('Should allow only unique users to be created', (done) => {
      server.post('/api/users')
        .send(testUser)
        .expect(409)
        .end((err, res) => {
          expect(res.body.message.includes('already exists')).to.equal(true);
          done();
        });
    });

    it('Should allow the SuperAdmin create an admin', (done) => {
      server.post('/api/users/createadmin')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testAdmin)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('New admin created');
          expect(res.body).to.have.property('newAdmin');
          expect(res.body.newAdmin).to.have.property('roleId');
          expect(res.body.newAdmin.roleId).to.equal(2);
          done();
        });
    });

    it('Should fail to create admin if admin already exists', (done) => {
      server.post('/api/users/createadmin')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testAdmin)
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.equal(`${testAdmin.email} already exists`);
          done();
        });
    });

    it('Should fail to create admin if invalid details are passed', (done) => {
      server.post('/api/users/createadmin')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testHelper.invalidAdmin())
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('An error occurred creating the admin');
          done();
        });
    });

    it('Should prevent creation of the SuperAdmin', (done) => {
      server.post('/api/users/createadmin')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testHelper.userWithRole(1))
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Admin must have a roleId of 2');
          done();
        });
    });

    it('Should prevent an admin from creating another admin', (done) => {
      server.post('/api/users/createadmin')
        .set({ 'x-access-token': adminDetails.token })
        .send(testHelper.userWithRole(2))
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should prevent a regular user from creating an admin', (done) => {
      server.post('/api/users/createadmin')
        .set({ 'x-access-token': regularDetails.token })
        .send(testHelper.userWithRole(2))
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should prevent users from specifying a role', (done) => {
      server.post('/api/users')
        .send(testHelper.userWithRole(1))
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('You cannot specify your role');
          done();
        });
    });

    it('Should give new users a default role (id=3, User)', (done) => {
      server.post('/api/users')
        .send(testHelper.userWithoutRole())
        .expect(201)
        .end((err, res) => {
          expect(res.body.newUser).to.have.property('roleId');
          expect(res.body.newUser.roleId).to.equal(3);
          done();
        });
    });

    it('Should not create a user with invalid email', (done) => {
      const user = testHelper.user();
      user.email = 'invalid';
      server.post('/api/users')
        .send(user)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('An error occurred creating the user');
          done();
        });
    });

    it('Should login user with correct details', () => {
      expect(adminDetails.message).to.equal('Signin successful');
    });

    it('Should issue a token to user on successful login', () => {
      expect(adminDetails).to.have.property('token');
      expect(adminDetails.token).not.to.equal(null);
    });

    it('Should not return the password on login', () => {
      expect(adminDetails.password).to.equal(undefined);
    });

    it('Should deny access for invalid details', (done) => {
      server.post('/api/users/signin')
        .send({ email: 'rotimi@gmail.com', password: 'johndoe123' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('Authentication failed! Wrong password');
          done();
        });
    });

    it('Should deny access is user is not in the database', (done) => {
      server.post('/api/users/signin')
        .send({ email: 'rotimi222@gmail.com', password: 'rotimi123' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('Signin failed! User not found');
          done();
        });
    });

    it('Should logout a user', (done) => {
      server.post('/api/users/logout')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('You have logged out');
          done();
        });
    });
  });

  describe('Get Users', () => {
    it('Should require token to see all users', (done) => {
      server.get('/api/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please supply a token for this route');
          done();
        });
    });

    it('Should allow the SuperAdmin to see all users', (done) => {
      server.get('/api/users')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.instanceOf(Array);
          done();
        });
    });

    it('Should allow an Admin to see all users', (done) => {
      server.get('/api/users')
        .set({ 'x-access-token': adminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.instanceOf(Array);
          done();
        });
    });

    it('Should allow the SuperAdmin to see a specific user', (done) => {
      server.get('/api/users/2')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          done();
        });
    });

    it('Should fail if the user id does not exist', (done) => {
      server.get('/api/users/200')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('Should fail if the user id is not valid', (done) => {
      server.get('/api/users/a')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('An error occurred getting the user');
          done();
        });
    });

    it('Should allow an Admin to see a specific user', (done) => {
      server.get('/api/users/2')
        .set({ 'x-access-token': adminDetails.token })
        .end((err, res) => {
          expect(res.body).to.have.property('firstName');
          expect(res.body).to.have.property('lastName');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          done();
        });
    });

    it('Should allow a user to access his details', (done) => {
      server.get(`/api/users/${regularDetails.newUser.id}`)
        .set({ 'x-access-token': regularDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.id).to.be.equal(regularDetails.newUser.id);
          done();
        });
    });

    it('Should prevent user from accessing details of other users', (done) => {
      server.get(`/api/users/${regularDetails.newUser.id + 1}`)
        .set({ 'x-access-token': regularDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Unauthorized access');
          done();
        });
    });
  });

  describe('Updating a user', () => {
    it('Should allow the SuperAdmin to update a user', (done) => {
      server.put('/api/users/3')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ firstName: 'updated name' })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('User successfully updated');
          done();
        });
    });

    it('Should allow an admin to update a user', (done) => {
      server.put('/api/users/3')
        .set({ 'x-access-token': adminDetails.token })
        .send({ firstName: 'updated name' })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('User successfully updated');
          done();
        });
    });

    it('Should prevent updating to the SuperAdmin role', (done) => {
      server.put('/api/users/updateRole/5')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ roleId: 1 })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('You cannot update to the SuperAdmin Role');
          done();
        });
    });

    it('Should allow the SuperAdmin to update a user\'s role', (done) => {
      server.put('/api/users/updateRole/3')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ roleId: 2 })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('User role successfully updated');
          done();
        });
    });

    it('Should prevent an admin from updating a user\'s role', (done) => {
      server.put('/api/users/updateRole/5')
        .set({ 'x-access-token': adminDetails.token })
        .send({ roleId: 2 })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should fail if the user to update does not exist', (done) => {
      server.put('/api/users/updateRole/500')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ roleId: 2 })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('Should fail id the old roleId is the same as the new roleId', (done) => {
      server.put('/api/users/updateRole/3')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ roleId: 2 })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.equal('Old role is the same as new role');
          done();
        });
    });

    it('Should fail if role to update to does not exist', (done) => {
      server.put('/api/users/updateRole/5')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ roleId: 10 })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('Unable to update to role that does not exist');
          done();
        });
    });


    it('Should not allow a regular user to update another user', (done) => {
      server.put(`/api/users/${regularDetails.newUser.id + 1}`)
        .set({ 'x-access-token': regularDetails.token })
        .send({ firstName: 'updated name' })
        .expect(403)
        .end((err, res) => {
          expect(res.body.message).to.equal('Unauthorized access');
          done();
        });
    });

    it('Should allow a user to update her own details', (done) => {
      server.put(`/api/users/${regularDetails.newUser.id}`)
        .set({ 'x-access-token': regularDetails.token })
        .send({ firstName: 'updated name' })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('User successfully updated');
          done();
        });
    });

    it('Should fail if the user id does not exist', (done) => {
      server.put('/api/users/100')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ firstName: 'updated name' })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('User with id 100 not found');
          done();
        });
    });

    it('Should allow only authenticated users to have access to updating', (done) => {
      server.put(`/api/users/${regularDetails.newUser.id}`)
        .send({ firstName: 'updated name' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please supply a token for this route');
          done();
        });
    });
  });

  describe('Deleting a user', () => {
    it('Should allow the SuperAdmin to delete a user', (done) => {
      server.delete(`/api/users/${regularDetails.newUser.id}`)
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.body.message).to.equal('User successfully deleted');
          done();
        });
    });

    it('Should not allow an admin to delete a user', (done) => {
      server.delete(`/api/users/${regularDetails.newUser.id}`)
        .set({ 'x-access-token': adminDetails.token })
        .end((err, res) => {
          expect(res.body.message).to.equal('You do not have superadmin rights');
          done();
        });
    });

    it('Should ensure SuperAdmin cannot be deleted', (done) => {
      server.delete('/api/users/1')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.body.message).to.equal('The SuperAdmin cannot be deleted');
          done();
        });
    });

    it('Should fail if the user to delete does not exist', (done) => {
      server.delete('/api/users/100')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Unable to delete because user is not found');
          done();
        });
    });
  });
});
