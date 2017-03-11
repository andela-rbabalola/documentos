import model from '../models';

/**
 * Helper class for controllers
 */
class Helpers {
  /**
   * Method to check if a user already exists
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static checkIfUserExists(req, res) {
    model.User.findOne({
      where: { email: req.body.email }
    })
      .then((oldUser) => {
        /**
         * if user already exists in the database
         * return http status code 409
         */
        if (oldUser) {
          return res.status(409)
            .send({ message: `${req.body.email} already exists` });
        }
      });
  }
}

export default Helpers;
