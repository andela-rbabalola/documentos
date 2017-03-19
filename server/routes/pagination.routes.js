import express from 'express';
import Authentication from '../middleware/authentication';
import Pagination from '../controllers/pagination.controllers';

const router = express.Router();

router.route('/users')
  .get(Authentication.decodeToken, Authentication.isAdmin, Pagination.getUserPagination);

router.route('/documents')
  .get(Authentication.decodeToken, Pagination.getDocumentsPagination);

export default router;
