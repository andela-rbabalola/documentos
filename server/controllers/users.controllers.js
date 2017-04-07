import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import model from '../models';
import Helpers from '../helpers/helpers';

const secret = process.env.JWT_SECRET || 'this is the secret';

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
    model.User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt'
      ]
    }).then(users => res.status(200)
      .send(users));
  }

  /**
   * Method to create a new admin
   * This method is only accessible to the admin
   * All admins must have a roleId of 2
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static createAdmin(req, res) {
    // Check roleId of request
    if (Helpers.checkRoleId(req, res)) {
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
              .send({
                message: 'New admin created',
                newAdmin: {
                  id: newAdmin.id,
                  firstName: newAdmin.firstName,
                  lastName: newAdmin.lastName,
                  email: newAdmin.email,
                  roleId: newAdmin.roleId,
                  createdAt: newAdmin.createdAt,
                  updatedAt: newAdmin.updatedAt
                },
                token,
                expiresIn: '3 days'
              });
          })
          .catch(error => res.status(400)
            .send({ errorMessage: error, message: 'An error occurred creating the admin' }));
      });
  }

  /**
   * Ensure user can't specify a role
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static createUser(req, res) {
    // ensure user cannot specify his role
    if (Helpers.ensureNoRole(req, res)) {
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
              RoleId: newUser.roleId,
              email: newUser.email
            }, secret, { expiresIn: '3 days' });
            return res.status(201)
              .send({
                message: 'New user created',
                newUser: {
                  id: newUser.id,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email,
                  roleId: newUser.roleId,
                  createdAt: newUser.createdAt,
                  updatedAt: newUser.updatedAt
                },
                token,
                expiresIn: '3 days'
              });
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
          RoleId: oldUser.roleId,
          email: oldUser.email
        }, secret, { expiresIn: '3 days' });
        return res.status(200)
          .send({ message: 'Signin successful', token, email: oldUser.email, success: true });
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
        .send({ errorMessage: error, message: 'An error occurred getting the user' }));
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
            .send({ message: 'User successfully updated', foundUser }));
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
    if (Helpers.isSuperAdmin(req, 'body', res)) {
      return res.status(403)
        .send({ message: 'You cannot update to the SuperAdmin Role' });
    }
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
              return res.status(409)
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
    // Ensure the super admin can't be deleted
    if (Helpers.isSuperAdmin(req, 'params', res)) {
      return res.status(403)
        .send({ message: 'The SuperAdmin cannot be deleted' });
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
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt'
      ],
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
      .then((user) => {
        if (user.length <= 0) {
          return res.status(404)
            .send({
              message: 'User Not Found',
            });
        }
        return res.status(200)
          .send(user);
      })
      .catch(error => res.status(400)
        .send(error));
  }

  /**
   * Method to logout a user
   *
   * @param {String} password
   * @param {String} hashedPassword
   * @returns {Boolean} Boolean Indicates if password matches
   */
  static logoutUser(req, res) {
    return res.status(200)
      .send({ message: 'You have logged out' });
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
