/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import model from '../../models';
import testHelper from '../helpers/testHelpers';

const expect = chai.expect;
const publicDocument = testHelper.dummyDocument(1);

describe('Document Model', () => {
  let document;

  before((done) => {
    model.Document.create(publicDocument)
      .then((createdDocument) => {
        document = createdDocument;
        done();
      });
  });

  after((done) => {
    model.Document.destroy({ where: { id: document.id } });
    done();
  });

  describe('Create document', () => {
    it('Should create a new document', () => {
      expect(document).to.exist;
      expect(typeof document).to.equal('object');
    });

    it('Should create a document with title and content', () => {
      expect(document.title).to.equal(publicDocument.title);
      expect(document.docContent).to.equal(publicDocument.docContent);
    });

    it('Should create a document with correct userId', () => {
      expect(document.userId).to.equal(1);
    });

    it('Should create a document with the date of creation', () => {
      expect(document.createdAt).to.exist;
    });

    it('should create a document with access set to public', () => {
      expect(document.access).to.equal('public');
    });
  });

  describe('Documents Validation', () => {
    it('Should require title field to create a document', (done) => {
      model.Document.create(testHelper.dummyDocumentNoTitle())
        .catch((error) => {
          expect(/notNull Violation: title cannot be null/
            .test(error.message)).to.be.true;
          done();
        });
    });

    it('Should ensure a role title is unique', () => {
      model.Document.create(publicDocument)
        .then(() => {
        })
        .catch((error) => {
          expect(/UniqueConstraintError/.test(error.name)).to.be.true;
        });
    });
  });
});
