import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;

let superAdminDetails;
let adminDetails;
let regularDetails;
let testDetails;

describe('Documents Test Suite', () => {
  before((done) => {
    server.post('/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        superAdminDetails = res.body;
        server.post('/users/signin')
          .send({ email: 'rotimi@gmail.com', password: 'rotimi123' })
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
  });

  describe('Create document', () => {
    it('Should create a document for passed valid input', (done) => {
      server.post('/documents')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testHelper.dummyDocument())
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('New document created');
          expect(res.body.newDocument).to.have.property('title');
          expect(res.body.newDocument).to.have.property('docContent');
          expect(res.body.newDocument).to.have.property('userId');
          done();
        });
    });

    it('Should have the date of creation defined', (done) => {
      server.post('/documents')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testHelper.dummyDocument())
        .expect(201)
        .end((err, res) => {
          expect(res.body.newDocument).to.have.property('createdAt');
          expect(res.body.newDocument.createdAt).not.to.equal(null);
          done();
        });
    });

    it('Should set its permission to public by default', (done) => {
      server.post('/documents')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testHelper.dummyDocumentNoPermission())
        .expect(201)
        .end((err, res) => {
          expect(res.body.newDocument).to.have.property('access');
          expect(res.body.newDocument.access).to.equal('public');
          done();
        });
    });

    it('Should fail to create a document if invalid input is passed', (done) => {
      server.post('/documents')
        .set({ 'x-access-token': superAdminDetails.token })
        .send({ title: null })
        .end((err, res) => {
          expect(500);
          expect(res.body.message).to.equal('An error occured creating the document');
          done();
        });
    });
  });

  describe('Get document', () => {
    let document;
    before((done) => {
      server.post('/documents')
        .set({ 'x-access-token': superAdminDetails.token })
        .send(testHelper.dummyDocumentWithArg('private', 1))
        .end((err, res) => {
          document = res.body;
          done();
        });
    });

    it('Should return a private document only to its owner', (done) => {
      server.get(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': testDetails.token })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('This document is private');
          done();
        });
    });

    it('Should get all documents for a specific user', (done) => {
      server.get(`documents/user/${regularDetails.newUser.id}`)
        .set({ 'x-access-token': regularDetails.token })
        .expect(200)
        .end((err, res) => {
          console.log('response', res);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].OwnerId).to.equal(regularDetails.user.id);
          done();
        });
    });
  });
});
