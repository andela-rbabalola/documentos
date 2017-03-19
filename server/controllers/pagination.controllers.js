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
}

export default Pagination;
