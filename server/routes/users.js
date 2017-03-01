import UserController from '../controllers/users';

const router = require('express').Router();

router.route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router.route('/:id')
  .get(UserController.getUserById)
  .put(UserController.updateUserAttributes)
  .delete(UserController.deleteUser);

export default router;
