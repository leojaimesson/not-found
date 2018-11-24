import express from 'express';
import controller from '../controller/DataController';

export default (app) => {
  const router = express.Router();
  router.get('/all-wastes', controller.retrieveAllWasteDataByPeriod);
  router.get('/all-wastes-full', controller.retrieveAllWasteDataByPeriodFull);
  router.get('/wastes', controller.retrieveWasteDataByPeriod);
  router.get('/roda', controller.retrieveWastesDataByPeriod);
  router.get('/roda-full', controller.retrieveWastesDataByPeriodFull);
  app.use('/datas', router);
};
