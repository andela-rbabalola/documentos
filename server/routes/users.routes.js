import express from 'express';
import UserController from '../controllers/users.controllers';
import documentController from '../controllers/documents.controllers';
import Authentication from '../middleware/authentication';

const router = express.Router();

/**
 * I removed admin authentication for this route because I need to be
 * able to get a list of all users emails on the front end
 */
router.route('/')
  .get(Authentication.decodeToken, UserController.getAllUsers)
  .post(UserController.createUser);

router.route('/createadmin')
  .post(Authentication.decodeToken, Authentication.isSuperAdmin, UserController.createAdmin);


router.route('/:id')
  .get(Authentication.decodeToken, Authentication.validateUser, UserController.getUserById)
  .put(Authentication.decodeToken, Authentication.validateUser, UserController.updateUser)
  .delete(Authentication.decodeToken, Authentication.isSuperAdmin, UserController.deleteUser);

router.route('/signin')
  .post(UserController.signIn);

router.route('/updateRole/:id')
  .put(Authentication.decodeToken, Authentication.isSuperAdmin, UserController.updateUserRole);

router.route('/logout')
  .post(UserController.logoutUser);

export default router;
