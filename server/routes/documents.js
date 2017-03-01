import documentController from '../controllers/documents';

const router = require('express').Router();


router.route('/')
  .get(documentController.getDocuments)
  .post(documentController.createDocument);

router.route('/:id')
  .get(documentController.getDocById)
  .put(documentController.updateDoc);
  // .delete(UserController.deleteUser);

export default router;
