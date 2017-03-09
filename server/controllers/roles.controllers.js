import model from '../models';

/**
 * Class to handle routing logic for roles
 */
class RolesController {
  /**
   * Method to create roles
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static createRole(req, res) {
    model.Role.findOne({
      where: { title: req.body.title }
    })
      .then((roleExists) => {
        /**
         * If role already exists
         * return http status code 409
         */
        if (roleExists) {
          return res.status(409)
            .send({ message: `Role ${req.body.title} already exists` });
        }
        // create role
        model.Role.create(req.body)
          .then(newRole => res.status(201)
            .send({ message: 'New role created', newRole }));
      })
      .catch(error => res.status(500)
        .send({ error: error.errors, message: 'An error occurred' }));
  }

  /**
   * Method to get a particular role
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getRoleById(req, res) {
    model.Role.findById(req.params.id)
      .then((foundRole) => {
        // check if user exists
        if (!foundRole) {
          return res.status(404)
            .send({ message: `Role with id ${req.params.id} not found` });
        }
        res.status(200)
          .send(foundRole);
      }).catch(error => res.status(400)
        .send(error));
  }

  /**
   * Method to get all roles
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static getRoles(req, res) {
    model.Role.findAll({
      include: [
        {
          model: model.User,
          as: 'users'
        }
      ]
    }).then(roles => res.status(200)
      .send(roles));
  }

  /**
   * Method to delete a role
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static deleteRole(req, res) {
    // Ensure admin role can't be deleted
    if (req.params.id === 1) {
      return res.status(403)
        .send({ message: 'Admin role can not be deleted' });
    }
    model.Role.findById(req.params.id)
      .then((foundRole) => {
        // check if role exists before deleting
        if (!foundRole) {
          return res.status(404)
            .send({ message: 'Unable to delete because role is not found' });
        }
        foundRole.destroy()
          .then(res.status(201)
            .send({ message: 'Role successfully deleted' }));
      });
  }

  /**
   * Method to update a role
   *
   * @param {Object} req Object containing the request
   * @param {Object} res Object containing the response
   * @returns {Object} res object
   */
  static updateRole(req, res) {
    // Put all this in a helper function to ensure SRP
    // Ensure admin role can't be updated
    if (req.params.id === '1') {
      return res.status(403)
        .send({ message: 'Admin role can not be updated' });
    }

    // check that title is unique
    model.Role.find({
      where: {
        title: req.body.title
      }
    }).then((foundTitle) => {
      if (foundTitle) {
        return res.status(409)
          .send({ message: 'Role titles must be unique' });
      }

      model.Role.findById(req.params.id)
        .then((foundRole) => {
          // check if role exists before updating
          if (!foundRole) {
            return res.status(404)
              .send({ message: `Unable to update because role ${req.params.id} is not found` });
          }
          return foundRole
            .update({
              title: req.body.title
            }).then(res.status(201)
              .send({ message: `Role ${req.params.id} successfully updated` }))
            .catch(error => res.status(400)
              .send(error));
        });
    });
  }
}

export default RolesController;
