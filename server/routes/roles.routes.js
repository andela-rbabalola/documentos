import rolesController from '../controllers/roles.controllers';
import Authentication from '../middleware/authentication';

const router = require('express').Router();

router.route('/')
  .get(Authentication.decodeToken, Authentication.isAdmin, rolesController.getRoles)
  .post(Authentication.decodeToken, Authentication.isAdmin, rolesController.createRole);

router.route('/:id')
  .get(Authentication.decodeToken, Authentication.isAdmin, rolesController.getRoleById)
  .delete(Authentication.decodeToken, Authentication.isAdmin, rolesController.deleteRole)
  .put(Authentication.decodeToken, Authentication.isAdmin, rolesController.updateRole);

export default router;
