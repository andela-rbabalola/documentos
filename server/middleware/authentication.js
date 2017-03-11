import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.JWT_SECRET || 'this is the secret';

/**
 * Class to handle authentication
 */
class Authentication {
  /**
   * Method to decode and verify a supplied token
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} res object
   */
  static decodeToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // If a token is not supplied, return an error
    if (!token) {
      return res.status(401)
        .send({ success: false, message: 'Please supply a token for this route' });
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.json({ success: false, message: 'Failed to authenticate token' });
      }
      // Save decoded to request object for use in other routes
      req.decoded = decoded;
      next();
    });
  }

  /**
   * Method to validate a user. Checks that the id param in the request object
   * matched the userId in the JWT token
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} res object
   */
  static validateUser(req, res, next) {
    // We convert the UserId to string because it is a number
    if (req.params.id !== req.decoded.UserId.toString() && (req.decoded.RoleId > 2)) {
      return res.status(401)
        .send({ success: false, message: 'You are not authorized to see this user' });
    }
    next();
  }

  /**
   * Method to verify if a user is the super admin
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} res object
   */
  static isSuperAdmin(req, res, next) {
    // First find user in the database
    models.User.findById(req.decoded.UserId)
      .then((foundUser) => {
        // Get user role from roles table
        models.Role.findById(foundUser.roleId)
          .then((userRole) => {
            if (userRole.title === 'SuperAdmin') {
              next();
            } else {
              return res.status(401)
                .send({ success: false, message: 'You do not have superadmin rights' });
            }
          });
      });
  }

  /**
   * Method to verify if a user is an admin
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} res object
   */
  static isAdmin(req, res, next) {
    // First find user in database
    models.User.findById(req.decoded.UserId)
      .then((foundUser) => {
        // Get user role from the roles table
        models.Role.findById(foundUser.roleId)
          .then((userRole) => {
            if (userRole.title === 'Admin' || userRole.title === 'SuperAdmin') {
              next();
            } else {
              return res.status(401)
                .send({ success: false, message: 'Only admins have access to this route' });
            }
          });
      });
  }
}

export default Authentication;
