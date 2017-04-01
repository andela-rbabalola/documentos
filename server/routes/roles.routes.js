import rolesController from '../controllers/roles.controllers';

const router = require('express').Router();

router.route('/')
  .get(rolesController.getRoles)
  .post(rolesController.createRole);

// delete a role??
export default router;
