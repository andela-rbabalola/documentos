import express from 'express';
import Authentication from '../middleware/authentication';
import UserPagination from '../controllers/pagination.controllers';

const router = express.Router();

router.route('/pagination')
  .get(Authentication.decodeToken, Authentication.isAdmin, UserPagination.getUserPagination);
