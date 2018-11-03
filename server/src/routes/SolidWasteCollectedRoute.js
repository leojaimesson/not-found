import express from 'express';
import controller from '../controller/SolidWasteCollectedController';

export default (app) => {
  const router = express.Router();

  router.post('/', controller.save);

  app.use('/solid-wasted-collecteds', router);
};
