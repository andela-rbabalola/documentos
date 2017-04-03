import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
// import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;
let superAdminDetails;

const limit = 2;

describe('Pagination Test Suite', () => {
  before((done) => {
    server.post('/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        superAdminDetails = res.body;
        done();
      });
  });
  describe('Users Pagination', () => {
    it('Should return the correct number of users for limit specified', () => {
      server.get(`/pagination/users/?limit=${limit}&offset=${undefined}`)
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(limit);
        });
    });
  });

  describe('Documents Pagination', () => {
    it('Should return the correct number of documents for limit specified', () => {
      server.get(`/pagination/documents/?limit=${limit}&offset=${undefined}`)
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(limit);
        });
    });
  });
});
