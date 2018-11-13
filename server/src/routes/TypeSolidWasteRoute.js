import express from 'express';
import controller from '../controller/TypeSolidWasteController';

export default (app) => {
  const router = express.Router();

  router.post('/', controller.save);
  router.delete('/', controller.deleteById);
  router.get('/', controller.getAll);

  app.use('/types-solid-waste', router);
};
