import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import model from '../models';
import Helpers from '../helpers/helpers';

const secret = process.env.JWT_SECRET || 'this is the secret';

// ABSTRACT YOUR FUNCTIONS INTO HELPER FUNCTIONS TO ENSURE SRP

/**
 * This class handles routing logic for user routes
 */
class UserController {
  /**
   * Method to get all the users
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static getAllUsers(req, res) {
    model.User.findAll().then(users => res.status(200)
      .send(users));
  }

  /**
   * Method to create a new admin
   * This method is only accessible to the admin
   * All admins must have a roleId of 1
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static createAdmin(req, res) {
    // abstract this
    if (req.body.roleId !== '2') {
      return res.status(400)
        .send({ message: 'Admin must have a roleId of 2' });
    }
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
        // create admin
        model.User.create(req.body)
          .then((newAdmin) => {
            const token = jwt.sign({
              UserId: newAdmin.id,
              RoleId: newAdmin.roleId
            }, secret, { expiresIn: '3 days' });
            return res.status(201)
              .send({ message: 'New admin created', newAdmin, token, expiresIn: '3 days' });
          })
          .catch(error => res.status(400)
            .send({ errorMessage: error, message: 'An error occurred creating the admin' }));
      });
  }

  /**
   * Method to create a user, fix this function when create admin is done
   * Ensure user can't specify his role
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static createUser(req, res) {
    // ensure user cannot specify his role
    if (req.body.roleId) {
      return res.status(403).send({
        message: 'You cannot specify your role'
      });
    }
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
        // create user
        model.User.create(req.body)
          .then((newUser) => {
            const token = jwt.sign({
              UserId: newUser.id,
              RoleId: newUser.roleId
            }, secret, { expiresIn: '3 days' });
            return res.status(201)
              .send({ message: 'New user created', newUser, token, expiresIn: '3 days' });
          })
          .catch(error => res.status(400)
            .send({ errorMessage: error, message: 'An error occurred creating the user' }));
      });
  }

  /**
   * Method to sign in a user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static signIn(req, res) {
    model.User.findOne({
      where: { email: req.body.email }
    })
      .then((oldUser) => {
        /**
         * if user does not exist in the database
         * return http status code 404
         */
        if (!oldUser) {
          return res.status(401)
            .send({ message: 'Signin failed! User not found' });
        } else if (!UserController.verifyPassword(req.body.password, oldUser.password)) {
          return res.status(401)
            .send({ message: 'Authentication failed! Wrong password', success: false });
        }
        // Create token
        const token = jwt.sign({
          UserId: oldUser.id,
          RoleId: oldUser.roleId
        }, secret, { expiresIn: '3 days' });
        return res.status(200)
          .send({ message: 'Signin successful', token, success: true });
      });
  }

  /**
   * Method to find a user by Id
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static getUserById(req, res) {
    model.User.findById(req.params.id)
      .then((foundUser) => {
        // check if user exists
        if (!foundUser) {
          return res.status(404)
            .send({ message: 'User not found' });
        }
        res.status(200)
          .send(foundUser);
      }).catch(error => res.status(400)
        .send(error));
  }

  /**
   * Method to update user attributes
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static updateUser(req, res) {
    // check that an id is specified
    // use authentication to ensure user really has said id
    model.User.findById(req.params.id)
      .then((foundUser) => {
        // check if user exists
        if (!foundUser) {
          return res.status(404)
            .send({ message: `User with id ${req.params.id} not found` });
        }
        return foundUser
          .update({
            firstName: req.body.firstName || foundUser.firstName,
            lastName: req.body.lastName || foundUser.lastName,
            email: req.body.email || foundUser.email,
            password: req.body.password || foundUser.password
          }).then(res.status(201)
            .send({ message: 'User successfully updated' }))
          .catch(error => res.status(400)
            .send(error));
      });
  }

  /**
   * Method to update a user's role
   * Only an admin can update a user's role
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static updateUserRole(req, res) {
    // first check roles table to ensure roleId in body exists
    model.Role.findById(req.body.roleId)
      .then((foundRole) => {
        // check if role exists
        if (!foundRole) {
          return res.status(404)
            .send({ message: 'Unable to update to role that does not exist' });
        }
        // If role is found check for user and update accordingly
        model.User.findById(req.params.id)
          .then((foundUser) => {
            if (!foundUser) {
              return res.status(404)
                .send({ message: 'User not found' });
            } else if (foundUser.roleId === req.body.roleId) {
              return res.status(400)
                .send({ message: 'Old role is the same as new role' });
            }
            return foundUser
              .update({
                roleId: req.body.roleId
              }).then(res.status(201)
                .send({ message: 'User role successfully updated' }))
              .catch(error => res.status(400)
                .send(error));
          });
      });
  }

  /**
   * Method to delete a user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static deleteUser(req, res) {
    if (req.params.id === '1') {
      return res.status(403).send({ message: 'The admin cannot be deleted' });
    }
    model.User.findById(req.params.id)
      .then((foundUser) => {
        // check if user exists
        if (!foundUser) {
          return res.status(404)
            .send({ message: 'Unable to delete because user is not found' });
        }
        foundUser.destroy()
          .then(res.status(201)
            .send({ message: 'User successfully deleted' }));
      });
  }

  /**
   * Method to search for a user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static searchForUser(req, res) {
    model.User.findAll({
      where: {
        $or: [{
          firstName: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          lastName: {
            $iLike: `%${req.query.q}%`
          }
        }, {
          email: {
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
   * Method to verify password
   *
   * @param {String} password
   * @param {String} hashedPassword
   * @returns {Boolean} Boolean Indicates if password matches
   */
  static verifyPassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
      return false;
    }
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default UserController;
