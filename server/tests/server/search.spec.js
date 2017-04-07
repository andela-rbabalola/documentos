/* eslint no-unused-expressions: "off" */
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;

let superAdminDetails;

describe('Search Test', () => {
  before((done) => {
    server.post('/api/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        superAdminDetails = res.body;
        done();
      });
  });

  describe('User search', () => {
    it('Should require a token for search', (done) => {
      server.get('/api/search/users/?q=rotimi')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please supply a token for this route');
          done();
        });
    });

    it('Should return a list of users based on search criteria', (done) => {
      server.get('/api/search/users/?q=r')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.body[0].firstName).to.exist;
          done();
        });
    });

    it('Should return user not found if query is not found', (done) => {
      server
        .get('/api/search/users/?q=zzzzzzz')
        .set({
          'x-access-token': superAdminDetails.token
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User Not Found');
          done();
        });
    });
  });

  describe('Document Search', () => {
    it('Should require a token for search', (done) => {
      server.get('/api/search/documents/?q=title')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Please supply a token for this route');
          done();
        });
    });

    it('Should return a list of users based on search criteria', (done) => {
      server.get('/api/search/documents/?q=e')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.body[0].docContent).to.exist;
          done();
        });
    });

    it('Should return document not found if query is not found', (done) => {
      server.get('/api/search/documents/?q=zzzzzzzzzz')
        .set({ 'x-access-token': superAdminDetails.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Document Not Found');
          done();
        });
    });

    it('Should allow a user to search their own documents', (done) => {
      server.post('/api/documents/search/user/1')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ query: 'hello' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          done();
        });
    });

    it('Should fail to search if an invalid user is passed', (done) => {
      server.post('/api/documents/search/user/a')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ query: 'hello' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('An error occurred searching the documents');
          done();
        });
    });
  });
});
