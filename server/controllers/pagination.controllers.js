import model from '../models';

/**
 * Handles pagination for getting all users
 */
class UserPagination {
  /**
   * Gets all users with pagination
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getUserPagination(req, res) {
    model.User.findAll({
      offset: req.query.offset,
      limit: req.query.limit
    })
      .then(users => res.status(200)
        .send(users));
  }
}

export default UserPagination;
