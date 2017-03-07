import express from 'express';
import UserController from '../controllers/users.controllers';
import documentController from '../controllers/documents.controllers';
import Authentication from '../middleware/authentication';

const router = express.Router();

router.route('/')
  .get(Authentication.decodeToken, Authentication.isAdmin, UserController.getAllUsers)
  .post(UserController.createUser);

router.route('/:id')
  .get(Authentication.decodeToken, Authentication.validateUser, UserController.getUserById)
  .put(Authentication.decodeToken, Authentication.validateUser, UserController.updateUser)
  .delete(Authentication.decodeToken, Authentication.isAdmin, UserController.deleteUser);

router.route('/:id/documents')
  .get(Authentication.decodeToken, Authentication.validateUser, documentController.getDocForUser);

router.route('/signin')
  .post(UserController.signIn);

router.route('/updateRole')
  .put(Authentication.decodeToken, Authentication.isAdmin, UserController.updateUserRole);

export default router;
