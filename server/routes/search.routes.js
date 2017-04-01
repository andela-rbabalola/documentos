import express from 'express';
import UserController from '../controllers/users.controllers';
import documentController from '../controllers/documents.controllers';
import Authentication from '../middleware/authentication';

const router = express.Router();

router.route('/users')
  .get(Authentication.decodeToken, UserController.searchForUser);

router.route('/documents')
  .get(Authentication.decodeToken, documentController.searchDocuments);

export default router;
