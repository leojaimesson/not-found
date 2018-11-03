import express from 'express';
import controller from '../controller/UserController';

export default (app) => {
  const router = express.Router();

  router.post('/', controller.save);
  router.get('/', controller.getByEmail);
  router.get('/', controller.getAll);

  app.use('/user', router);
};
