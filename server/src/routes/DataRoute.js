import express from 'express';
import controller from '../controller/DataController';

export default (app) => {
  const router = express.Router();
  router.get('/all-wastes', controller.retrieveAllWasteDataByPeriod);

  app.use('/datas', router);
};
