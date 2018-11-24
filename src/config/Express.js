import express from 'express';
import { json, urlencoded } from 'body-parser';
import path from 'path';
import cors from 'cors';

import env from './Environment';
import user from '../routes/UserRoute';
import typeSolidWaste from '../routes/TypeSolidWasteRoute';
import solidWasteCollected from '../routes/SolidWasteCollectedRoute';
import data from '../routes/DataRoute';

const settingRoutes = (app) => {
  user(app);
  typeSolidWaste(app);
  solidWasteCollected(app);
  data(app);
};

export default () => {
  const app = express();

  app.set('port', env.server.port);

  app.set('name', 'Not Found API');

  app.use(json());

  app.use(urlencoded({
    extended: false,
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

  settingRoutes(app);

  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '..', '..', 'resources', 'public', 'index.html'));
  });

  return app;
};
