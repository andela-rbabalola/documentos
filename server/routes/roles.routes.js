import rolesController from '../controllers/roles.controllers';
import Authentication from '../middleware/authentication';

const router = require('express').Router();

router.route('/')
  .get(Authentication.decodeToken, Authentication.isSuperAdmin, rolesController.getRoles)
  .post(Authentication.decodeToken, Authentication.isSuperAdmin, rolesController.createRole);

router.route('/:id')
  .get(Authentication.decodeToken, Authentication.isSuperAdmin, rolesController.getRoleById)
  .delete(Authentication.decodeToken, Authentication.isSuperAdmin, rolesController.deleteRole)
  .put(Authentication.decodeToken, Authentication.isSuperAdmin, rolesController.updateRole);

export default router;
