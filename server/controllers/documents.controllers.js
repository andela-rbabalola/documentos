import model from '../models';

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
        .send(error));
  }

  /**
   * Method to get documents
   * Admins can see all documents while ordinary users see just public documents
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getDocuments(req, res) {
    // check if the user is an admin - admins have a roleId of 1
    if (req.decoded.RoleId === 1) {
      model.Document.findAll({}).then(documents => res.status(200)
        .send(documents))
        .catch(error => res.status(400)
          .send(error));
    } else {
      // If user is not an admin show only public documents
      model.Document.findAll({
        where: {
          access: 'public'
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
            .send({ message: `Document with id ${req.body.id} not found` });
        } else if (foundDoc.access === 'private' && (foundDoc.userId.toString() === req.params.id)) {
          return res.status(200)
            .send(foundDoc);
        } else if (foundDoc.access === 'private') {
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
        }
        return foundDoc
          .update({
            title: req.body.title || foundDoc.title,
            text: req.body.text || foundDoc.text
          }).then(res.status(201)
            .send({ message: 'Document successfully updated' }))
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
        if (!documents.length) {
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
   * Method that searches both title and text of documents
   * Can admin search all docs??
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static searchDoc(req, res) {
    model.Document.findAll({
      where: {
        access: 'public',
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
}

export default DocumentsController;
