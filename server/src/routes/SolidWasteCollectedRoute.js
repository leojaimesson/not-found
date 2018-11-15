import express from 'express';
import controller from '../controller/SolidWasteCollectedController';

export default (app) => {
  const router = express.Router();

  router.post('/', controller.save);
  router.delete('/', controller.deleteById);
  router.get('/', controller.getAll);

  app.use('/solid-waste-collected', router);
};
