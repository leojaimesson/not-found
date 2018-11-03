import express from 'express';
import controller from '../controller/TypeSolidWasteController';

export default (app) => {
  const router = express.Router();

  router.post('/', controller.save);

  app.use('/user', router);
};
