import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;
const testUser = testHelper.user();

let adminDetails;
let regularDetails;
let testDetails;

describe('Users Test Suite', () => {
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
            server.post('/users')
              .send(testHelper.user())
              .end((err, res) => {
                testDetails = res.body;
                done();
              });
          });
      });
  });

  describe('Authentication', () => {
    it('Should create a user given valid details', (done) => {
      server.post('/users')
        .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
        .type('form')
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.newUser).to.have.property('firstName');
          expect(res.body.newUser).to.have.property('lastName');
          expect(res.body.newUser).to.have.property('email');
          expect(res.body.newUser).to.have.property('roleId');
          expect(res.body.newUser).to.have.property('password');
          done();
        });
    });

    it('Should allow only unique users to be created', (done) => {
      server.post('/users')
        .send(testUser)
        .expect(409)
        .end((err, res) => {
          expect(res.body.message.includes('already exists')).to.equal(true);
          done();
        });
    });

    it('Should give new users a default role (id=2, user)', (done) => {
      server.post('/users')
        .send(testHelper.userWithoutRole())
        .expect(201)
        .end((err, res) => {
          expect(res.body.newUser).to.have.property('roleId');
          expect(res.body.newUser.roleId).to.equal(2);
          done();
        });
    });

    it('Should not create a user with invalid email', (done) => {
      const user = testHelper.user();
      user.email = 'invalid';
      server.post('/users')
        .send(user)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('An error occurred creating the user');
          done();
        });
    });

    it('Should login user with correct details', (done) => {
      const user = testHelper.user();
      server.post('/users')
        .type('form')
        .send(user)
        .end(() => {
          server.post('/users/signin')
            .send(user)
            .expect(200)
            .end((err, res) => {
              expect(res.body.message).to.equal('Signin successful');
              done();
            });
        });
    });

    // problem test
    it('Should issue a token to user on successful login', (done) => {
      const user = testHelper.user();
      server.post('/users')
        .type('form')
        .send(user)
        .end(() => {
          server.post('/users/signin')
            .send(user)
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.have.property('token');
              expect(res.body.token).not.to.equal(null);
              done();
            });
        });
    });

    it('Should not return password on login', (done) => {
      const user = testHelper.user();
      server.post('/users')
        .type('form')
        .send(user)
        .end(() => {
          server.post('/users/signin')
            .send(user)
            .expect(200)
            .end((err, res) => {
              expect(res.body.password).to.equal(undefined);
              done();
            });
        });
    });

    it('Should deny access for invalid details', (done) => {
      server.post('/users/signin')
        .send({ email: 'rotimi@gmail.com', password: 'johndoe123' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('Authentication failed! Wrong password');
          done();
        });
    });

    // test for password length in models
    describe('Get Users', () => {
      it('Should require token to see all users', (done) => {
        server.get('/users')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Please supply a token for this route');
            done();
          });
      });

      it('Should allow admin to see all users', (done) => {
        server.get('/users')
          .set({ 'x-access-token': adminDetails.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.instanceOf(Array);
            done();
          });
      });

      it('Should allow the admin to see a specific user', (done) => {
        server.get('/users/4')
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
        server.get(`/users/${regularDetails.newUser.id}`)
          .set({ 'x-access-token': regularDetails.token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.id).to.be.equal(regularDetails.newUser.id);
            done();
          });
      });

      it('Should prevent user from accessing details of other users', (done) => {
        server.get(`/users/${regularDetails.newUser.id + 1}`)
          .set({ 'x-access-token': regularDetails.token })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('You are not authorized to see this user');
            done();
          });
      });
    });

    describe('Updating a user', () => {
      it('Should allow admin to update any user', (done) => {
        server.put('/users/4')
          .set({ 'x-access-token': adminDetails.token })
          .send({ firstName: 'updated name' })
          .expect(201)
          .end((err, res) => {
            expect(res.body.message).to.equal('User successfully updated');
            done();
          });
      });

      it('Should not allow a non admin to update another user', (done) => {
        server.put(`/users/${regularDetails.newUser.id + 1}`)
          .set({ 'x-access-token': regularDetails.token })
          .send({ firstName: 'updated name' })
          .expect(401)
          .end((err, res) => {
            expect(res.body.message).to.equal('You are not authorized to see this user');
            done();
          });
      });

      it('Should allow a user to update her own details', (done) => {
        server.put(`/users/${regularDetails.newUser.id}`)
          .set({ 'x-access-token': regularDetails.token })
          .send({ firstName: 'updated name' })
          .expect(201)
          .end((err, res) => {
            expect(res.body.message).to.equal('User successfully updated');
            done();
          });
      });

      it('Should allow only authenticated users to have access to updating', (done) => {
        server.put(`/users/${regularDetails.newUser.id}`)
          .send({ firstName: 'updated name' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Please supply a token for this route');
            done();
          });
      });
    });

    describe('Deleting a user', () => {
      it('Should allow the admin to delete a user', (done) => {
        server.delete(`/users/${regularDetails.newUser.id}`)
          .set({ 'x-access-token': adminDetails.token })
          .end((err, res) => {
            expect(res.body.message).to.equal('User successfully deleted');
            done();
          });
      });

      // problem test??
      it('Should not allow a non admin to delete a user', (done) => {
        server.delete(`/users/${testDetails.newUser.id}`)
          .set({ 'x-access-token': testDetails.token })
          .end((err, res) => {
            expect(res.body.message).to.equal('Only admins have access to this route');
            done();
          });
      });

      it('Should ensure admin cannot be deleted', (done) => {
        server.delete('/users/1')
          .set({ 'x-access-token': adminDetails.token })
          .end((err, res) => {
            expect(res.body.message).to.equal('The admin cannot be deleted');
            done();
          });
      });
    });
  });
});
