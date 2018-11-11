import express from 'express';
import controller from '../controller/UserController';

export default (app) => {
  const router = express.Router();

  router.post('/', controller.save);
  router.delete('/', controller.deleteById);
  router.get('/', controller.getAll);
  router.get('/', controller.getByEmail);

  app.use('/users', router);
};
