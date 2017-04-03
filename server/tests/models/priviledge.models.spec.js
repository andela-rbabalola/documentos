/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import model from '../../models';
import testHelper from '../helpers/testHelpers';

const expect = chai.expect;
const publicDocument = testHelper.dummyDocument(1);
const sharedEntry = testHelper.dummySharedEntry();

describe('Priviledge Model', () => {
  let newDocument, priviledge;

  before((done) => {
    model.Document.create(publicDocument)
      .then((createdDocument) => {
        newDocument = createdDocument;
        sharedEntry.docId = newDocument.id;
        done();
      });
  });

  describe('Create a shared document', () => {
    it('Should share a document', (done) => {
      model.Priviledge.create(sharedEntry)
        .then((newPriviledge) => {
          priviledge = newPriviledge;
          done();
        });
    });

    it('Should ensure priviledge data for a document exists', () => {
      expect(priviledge).to.exist;
      expect(typeof priviledge).to.equal('object');
      expect(priviledge).to.have.property('email');
    });

    it('Should ensure priviledge data has docId', () => {
      expect(priviledge.docId).to.equal(newDocument.id);
    });

    it('Should share document with canEdit access set', () => {
      expect(priviledge).to.have.property('canEdit');
    });
  });

  describe('Shared Model validation', () => {
    it('Should require email to be valid', (done) => {
      model.Priviledge.create(testHelper.dummySharedEntryNoEmail())
        .catch((error) => {
          expect(/ValidationError/.test(error.name)).to.be.true;
          done();
        });
    });
  });
});
