'use strict';

import jwt from 'jsonwebtoken';
import model from '../models';

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
    model.User.findAll().then(users => res.status(200)
      .send(users));
  }

  /**
   * Method to create a user
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static createUser(req, res) {
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
          .then(newUser =>
            res.status(201)
              .send({ message: 'New user created', newUser }))
              .catch(error => res.status(400)
              .send(error.errors));
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
        // return res.send(foundUser);
      }).catch(error => res.status(400)
        .send(error.errors));
  }

  /**
   * Method to update user attributes
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res object
   */
  static updateUserAttributes(req, res) {
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
            password: req.body.password || foundUser.password,
            RoleId: req.body.RoleId || foundUser.RoleId
          }).then(res.status(201)
            .send({ message: 'User successfully updated' }))
            .catch(error => res.status(400)
            .send(error.errors));
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
}
// find by name or subset of name ??
export default UserController;
