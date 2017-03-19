import express from 'express';
import UserController from '../controllers/users.controllers';
import documentController from '../controllers/documents.controllers';
import Authentication from '../middleware/authentication';

const router = express.Router();

router.route('/')
  .get(Authentication.decodeToken, Authentication.isAdmin, UserController.getAllUsers)
  .post(UserController.createUser);

// pagination for users
router.route('/pagination')
  .post((req, res) => {
    res.redirect(`/pagination/users/?limit=${req.body.limit}&offset=${req.body.offset}`);
  });

// Route to search for a user
router.route('/search')
  .post((req, res) => {
    res.redirect(`/search/users/?q=${req.body.query}`);
  });

router.route('/:id')
  .get(Authentication.decodeToken, Authentication.validateUser, UserController.getUserById)
  .put(Authentication.decodeToken, Authentication.validateUser, UserController.updateUser)
  .delete(Authentication.decodeToken, Authentication.isSuperAdmin, UserController.deleteUser);

router.route('/:id/documents')
  .get(Authentication.decodeToken, Authentication.validateUser, documentController.getDocForUser);

router.route('/signin')
  .post(UserController.signIn);

router.route('/updateRole/:id')
  .put(Authentication.decodeToken, Authentication.isSuperAdmin, UserController.updateUserRole);

router.route('/createadmin')
  .post(Authentication.decodeToken, Authentication.isSuperAdmin, UserController.createAdmin);

export default router;
