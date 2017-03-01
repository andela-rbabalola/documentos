'use strict';

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
      // handle errors
      .catch(error => res.status(400)
        .send(error.errors));
  }

  /**
   * Method to get documents
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getDocuments(req, res) {
    model.Document.findAll({}).then(documents => res.status(200)
      .send(documents));
  }

  /**
   * Method to find a document by id
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
        }
        res.status(200)
          .send(foundDoc);
      })
      .catch(error => res.status(400)
        .send(error.errors));
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
            .send({ message: 'Document not found' });
        }
        return foundDoc
          .update({
            title: req.body.title || foundDoc.title,
            text: req.body.text || foundDoc.text
          }).then(res.status(201)
            .send({ message: 'Document successfully updated' }))
            .catch(error => res.status(400)
            .send(error.errors));
      });
  }
}

export default DocumentsController;
