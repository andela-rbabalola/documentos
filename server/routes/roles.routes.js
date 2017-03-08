import rolesController from '../controllers/roles.controllers';
import Authentication from '../middleware/authentication';

const router = require('express').Router();

router.route('/')
  .get(Authentication.decodeToken, Authentication.isAdmin, rolesController.getRoles)
  .post(Authentication.decodeToken, Authentication.isAdmin, rolesController.createRole);

// delete a role??
export default router;
