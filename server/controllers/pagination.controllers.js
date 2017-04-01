import model from '../models';

/**
 * Handles pagination
 */
class Pagination {
  /**
   * Gets all users with pagination
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getUserPagination(req, res) {
    req.query.limit = (req.query.limit > 0) ? req.query.limit : 3;
    req.query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    model.User.findAll({
      limit: req.query.limit,
      offset: req.query.offset
    })
      .then(users => res.status(200)
        .send(users));
  }

  /**
   * Gets all documents with pagination
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getDocumentsPagination(req, res) {
    req.query.limit = (req.query.limit > 0) ? req.query.limit : 3;
    req.query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    if (req.decoded.RoleId < 2) {
      model.Document.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        order: '"createdAt" DESC'
      }).then(documents => res.status(200)
        .send(documents))
        .catch(error => res.status(400)
          .send(error));
    } else {
      // If user is not an admin show only public documents
      model.Document.findAll({
        limit: req.query.limit,
        offset: req.query.offset,
        order: '"createdAt" DESC',
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
}

export default Pagination;
