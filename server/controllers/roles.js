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
      .catch(error => res.status(400)
        .send(error.errors));
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
}

export default RolesController;
