import model from '../models';

// IMPsLEMENT ROLE ACCESS

/**
 * Class to handle routing logic for documents
 */
class DocumentsController {
  /**
   * Method to create documents
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static createDocument(req, res) {
    model.Document.create(req.body)
      .then(newDocument => res.status(201)
        .send({ message: 'New document created', newDocument }))
      // catch errors
      .catch(error => res.status(400)
        .send({ error, message: 'An error occured creating the document' }));
  }

  /**
   * Method to get documents
   * The SuperAdmin and Admin can see all documents
   * while ordinary users see only public and role documents
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getDocuments(req, res) {
    if (req.decoded.RoleId < 2) {
      model.Document.findAll({
        order: '"createdAt" DESC',
      }).then(documents => res.status(200)
        .send(documents))
        .catch(error => res.status(400)
          .send(error));
    } else {
      /**
       * If user is not an admin show only public documents
       * and their own documents
       */
      model.Document.findAll({
        where: {
          $or: [{
            access: 'public',
          }, {
            userId: req.decoded.UserId
          }]
        }
      })
        .then(documents => res.status(200)
          .send(documents))
        // catch errors
        .catch(error => res.status(400)
          .send(error));
    }
  }

  /**
   * Method to find a public (or private) document by id
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getDocById(req, res) {
    model.Document.findById(req.params.id)
      .then((foundDoc) => {
        // check if document exists
        if (!foundDoc) {
          return res.status(404)
            .send({ message: `Document with id ${req.params.id} not found` });
        } else if (foundDoc.access === 'private' && req.decoded.RoleId > 2) {
          return res.status(401)
            .send({ message: 'This document is private' });
        }
        res.status(200)
          .send(foundDoc);
      })
      .catch(error => res.status(400)
        .send(error));
  }

  /**
   * Method to update a document
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static updateDoc(req, res) {
    model.Document.findById(req.params.id)
      .then((foundDoc) => {
        // check if user exists
        if (!foundDoc) {
          return res.status(404)
            .send({ message: 'Document to be updated not found' });
        } else if (foundDoc.userId !== req.decoded.UserId && (req.decoded.RoleId > 2)) {
          return res.status(401)
            .send({ message: 'You are not authorized to update this document' });
        }
        return foundDoc
          .update({
            title: req.body.title || foundDoc.title,
            docContent: req.body.docContent || foundDoc.docContent,
            access: req.body.access || foundDoc.access
          }).then(res.status(201)
            .send({ message: 'Document successfully updated', foundDoc }))
          // handle errors
          .catch(error => res.status(400)
            .send(error));
      });
  }

  /**
   * Method to delete a document
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static deleteDoc(req, res) {
    model.Document.findById(req.params.id)
      .then((foundDoc) => {
        // check if document exists before deleting
        if (!foundDoc) {
          return res.status(404)
            .send({ message: 'Unable to delete because document is not found' });
        } else if (foundDoc.userId !== req.decoded.UserId && (req.decoded.RoleId > 2)) {
          return res.status(401)
            .send({ message: 'You are not authorized to delete this document' });
        }
        foundDoc.destroy()
          .then(res.status(201)
            .send({ message: 'Document successfully deleted' }))
          .catch(error => res.status(400)
            .send(error));
      });
  }

  /**
   * Get documents belonging to a particular user
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getDocForUser(req, res) {
    model.Document.findAll({
      where: {
        userId: req.params.id
      }
    })
      .then((documents) => {
        if (!documents) {
          return res.status(404)
            .send({ message: 'No match found for query' });
        }
        return res.status(200).send(documents);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * Search documents belonging to a particular user
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static searchUserDoc(req, res) {
    model.Document.findAll({
      where: {
        userId: req.params.id,
        $or: [{
          docContent: {
            $iLike: `%${req.body.query}%`
          }
        }, {
          title: {
            $iLike: `%${req.body.query}%`
          }
        }]
      }
    })
      .then(documents => res.status(200)
        .send(documents))
      .catch(error => res.status(400)
        .send(error));
  }

  /**
   * Method that searches only the title of documents
   * Can admin search all docs??
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static searchDocuments(req, res) {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    model.Document.findAll({
      where: {
        $or: [{
          title: {
            $iLike: `%${req.query.q}%`
          }
        }]
      }
    })
      .then(documents => res.status(200)
        .send(documents))
      .catch(error => res.status(400)
        .send(error));
  }

  /**
   * Method to get documents with role access for a user
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getRoleDocs(req, res) {
    // we can get the userId and roleId of user making request
    // from the JWT
    // first get all docs with access = role
    const results = [];
    const returnResults = () => {
      res.send(results);
    };
    model.Document.findAll({
      where: {
        access: 'role'
      }
    })
      .then((document) => {
        document.forEach((doc, docIndex) => {
          model.User.findById(document[docIndex].userId)
            .then((user) => {
              if ((req.decoded.roleId !== 1) && (req.decoded.RoleId !== user.roleId)) {
                results.push('You do not have access to this document');
              } else {
                results.push(doc);
              }
              if (docIndex === document.length - 1) {
                returnResults();
              }
            });
        });
      });
  }

}

export default DocumentsController;
