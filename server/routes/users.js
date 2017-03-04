import UserController from '../controllers/users';
import documentController from '../controllers/documents';

const router = require('express').Router();

router.route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router.route('/:id')
  .get(UserController.getUserById)
  .put(UserController.updateUserAttributes)
  .delete(UserController.deleteUser);

router.route('/:id/documents')
  .get(documentController.getDocForUser);

router.route('/signin')
  .post(UserController.signIn);

export default router;
