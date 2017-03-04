import UserController from '../controllers/users.controllers';
import documentController from '../controllers/documents.controllers';
import Authentication from '../middleware/authentication';

const router = require('express').Router();

router.route('/')
  .get(Authentication.decodeToken, Authentication.isAdmin, UserController.getAllUsers)
  .post(UserController.createUser);

router.route('/:id')
  .get(Authentication.decodeToken, Authentication.validateUser, UserController.getUserById)
  .put(Authentication.decodeToken, Authentication.validateUser, UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/:id/documents')
  .get(documentController.getDocForUser);

router.route('/signin')
  .post(UserController.signIn);

router.route('/updateRole')
  .put(UserController.updateUserRole);

export default router;
