import express from 'express';
import documentController from '../controllers/documents.controllers';
import Authentication from '../middleware/authentication';

const router = express.Router();


router.route('/')
  .get(Authentication.decodeToken, documentController.getDocuments)
  .post(Authentication.decodeToken, documentController.createDocument);

router.route('/:id')
  .get(Authentication.decodeToken, documentController.getDocById)
  .put(Authentication.decodeToken, Authentication.validateUser, documentController.updateDoc)
  .delete(Authentication.decodeToken, Authentication.validateUser, documentController.deleteDoc);

// Route to get documents for a user
router.route('/user/:id')
  .get(Authentication.decodeToken, Authentication.validateUser, documentController.getDocForUser);

router.route('/search')
  .post(Authentication.decodeToken, documentController.searchDoc);

// Route for a user to search their own docs
router.route('/search/user/:id')
  .post(Authentication.decodeToken, Authentication.validateUser, documentController.searchUserDoc);

export default router;
