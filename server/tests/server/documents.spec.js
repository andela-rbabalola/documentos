import chai from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../server';
import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;

let superAdminToken;
let superAdminUser;
let regularUser;
let regularToken;
let testToken;
let document;
let regularDocs;
let allPublicDocuments;
let allDocuments;

describe('Documents Test Suite', () => {
  before((done) => {
    server.post('/users/signin')
      .type('form')
      .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
      .end((err, res) => {
        superAdminToken = res.body.token;
        server.post('/users')
          .send(testHelper.user())
          .end((err, res) => {
            regularUser = res.body;
            regularToken = res.body.token;
            server.post('/users')
              .send(testHelper.user())
              .end((err, res) => {
                testToken = res.body.token;
                done();
              });
          });
      });
  });

  before((done) => {
    server.post('/documents')
      .set({ 'x-access-token': superAdminToken })
      .send(testHelper.dummyDocumentWithArg('private', 1))
      .end((err, res) => {
        document = res.body;
        server.get('/documents')
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            allPublicDocuments = res.body;
            server.get('/documents')
              .set({ 'x-access-token': superAdminToken })
              .end((err, res) => {
                allDocuments = res.body;
                server.post('/documents')
                  .set({ 'x-access-token': regularToken })
                  .send(testHelper.dummyDocument(regularUser.newUser.id))
                  .end((err, res) => {
                    regularDocs = res.body;
                    done();
                  });
              });
          });
      });
  });


  describe('Create document', () => {
    it('Should create a document for passed valid input', (done) => {
      server.post('/documents')
        .set({ 'x-access-token': superAdminToken })
        .send(testHelper.dummyDocument(1))
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
        .set({ 'x-access-token': superAdminToken })
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
        .set({ 'x-access-token': superAdminToken })
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
        .set({ 'x-access-token': superAdminToken })
        .send({ title: null })
        .end((err, res) => {
          expect(500);
          expect(res.body.message).to.equal('An error occured creating the document');
          done();
        });
    });
  });

  describe('Get document', () => {
    it('Should return all documents to the SuperAdmin', (done) => {
      expect(Array.isArray(allDocuments)).to.equal(true);
      expect(allDocuments.length).to.be.greaterThan(allPublicDocuments.length);
      allDocuments.forEach((doc) => {
        expect(doc).to.have.property('access');
        expect(doc).to.have.property('userId');
        expect(doc).to.have.property('docContent');
      });
      done();
    });

    it('Should return only public documents to a regular user', (done) => {
      expect(Array.isArray(allPublicDocuments)).to.equal(true);
      expect(allPublicDocuments.length).to.be.lessThan(allDocuments.length);
      allPublicDocuments.forEach((doc) => {
        expect(doc).to.have.property('access');
        expect(doc.access).to.equal('public');
      });
      done();
    });

    it('Should return all documents starting from the most recent', (done) => {
      server.get('/documents')
        .set({ 'x-access-token': superAdminToken })
        .expect(200).end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].id).not.to.equal(1);
          expect(res.body[0].createdAt).to.be.greaterThan(res.body[1].createdAt);
          done();
        });
    });

    it('Should only return a private document to its owner', (done) => {
      server.get(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': testToken })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal('This document is private');
          done();
        });
    });

    it('Should get all documents for a specific user', (done) => {
      server.get(`/documents/user/${regularUser.newUser.id}`)
        .set({ 'x-access-token': regularToken })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].userId).to.equal(regularUser.newUser.id);
          done();
        });
    });

    it('Should return a private document to the SuperAdmin', (done) => {
      server.get(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': superAdminToken })
        .expect(200).end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.access).to.equal('private');
          expect(res.body.title).to.equal(document.newDocument.title);
          done();
        });
    });

    it('Should fail if a document does not exist', (done) => {
      server.get('/documents/1000')
        .set({ 'x-access-token': superAdminToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Document with id 1000 not found');
          done();
        });
    });
  });

  describe('Update Document', () => {
    before((done) => {
      server.post('/documents')
        .set({ 'x-access-token': regularToken })
        .send(testHelper.dummyDocumentWithArg('private', regularUser.newUser.id))
        .end((err, res) => {
          document = res.body;
          done();
        });
    });

    it('Should allow the owner of a document to edit it', (done) => {
      server.put(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': regularToken })
        .send({ title: 'New title' })
        .expect(200)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Document successfully updated');
          expect(res.body.foundDoc.title).to.equal('New title');
          done();
        });
    });

    it('Should not allow you to edit a document you don\'t own', (done) => {
      server.put(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': testToken })
        .send({ title: 'Doc title updated' })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('You are not authorized to update this document');
          done();
        });
    });

    it('Should fail if the document does not exist', (done) => {
      server.put('/documents/100')
        .set({ 'x-access-token': regularToken })
        .send({ title: 'doc title updated' })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Document to be updated not found');
          done();
        });
    });
  });

  describe('Delete documents', () => {
    it('Should not allow you to delete a document you don\'t own', (done) => {
      server.delete(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': testToken })
        .expect(401)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('You are not authorized to delete this document');
          done();
        });
    });

    it('Should fail if document does not exist', (done) => {
      server.delete('/documents/100')
        .set({ 'x-access-token': regularToken })
        .expect(404)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Unable to delete because document is not found');
          done();
        });
    });

    it('Should delete a document', (done) => {
      server.delete(`/documents/${document.newDocument.id}`)
        .set({ 'x-access-token': superAdminToken })
        .expect(201)
        .end((err, res) => {
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Document successfully deleted');
          done();
        });
    });
  });
});
