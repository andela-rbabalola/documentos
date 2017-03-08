import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';


const server = supertest.agent(app);
const expect = chai.expect;

let adminDetails;
let regularDetails;


describe('Role', () => {
  before((done) => {
    console.log('Hello');
    server.post('/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        console.log('Hello', res.body);
        adminDetails = res.body;
        server.post('/users')
          .send(testHelper.user())
          .end((err, res) => {
            regularDetails = res.body;
            done();
          });
      });
  });

  describe('Should create a new role', () => {
    const newRole = testHelper.defaultRole();
    it('Ensures admin can create a role', (done) => {
      server.post('/roles/')
        .set({ 'x-access-token': adminDetails.token })
        .send(newRole)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          console.log('Title', res.body.newRole.title);
          expect(res.body.newRole.title).to.equal(newRole.title);
          done();
        });
    });
  });
});
