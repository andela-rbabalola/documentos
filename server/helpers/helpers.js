import model from '../models';

/**
 * Helper class for controllers
 */
class Helpers {
  /**
   * Method to check the roleId in a request
   * Ensure it is equal to 2
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   * Use parse int here and in other places
   */
  static checkRoleId(req) {
    return req.body.roleId.toString() !== '2';
  }

  /**
   * Method to ensure a role cannot be
   * specified when a user is created
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static ensureNoRole(req) {
    return req.body.roleId;
  }

  /**
   * Method to ensure the super admin can't
   * be deleted
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static isSuperAdmin(req, where) {
    // if (where === 'params') {
    //   return req.params.id === '1';
    // }
    return (where === 'params') ? req.params.id === '1' : req.body.roleId === 1;
  }

  /**
   * Method to ensure the super admin can't
   * be deleted
   *
   * @param {Object} userId
   * @returns {String} - roleId of user
   */
  static getRoleIdFromUserId(userId) {
    model.User.findById(userId)
      .then((document) => {
        // return res.status(200).send(documents);
        // console.log('Role Id', documents.roleId);
        return document;
      });
  }
}

export default Helpers;
