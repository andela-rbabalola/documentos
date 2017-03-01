import rolesController from '../controllers/roles';

const router = require('express').Router();

router.route('/')
  .get(rolesController.getRoles)
  .post(rolesController.createRole);

export default router;
