import express from 'express';
import { json, urlencoded } from 'body-parser';
import path from 'path';
import cors from 'cors';

import env from './Environment';
import user from '../routes/UserRoute';
import typeSolidWaste from '../routes/TypeSolidWasteRoute';
import solidWasteCollected from '../routes/SolidWasteCollectedRoute';

const settingRoutes = (app) => {
  user(app);
  typeSolidWaste(app);
  solidWasteCollected(app);
};

export default () => {
  const app = express();

  app.set('port', env.server.port);

  app.set('name', 'Not Found API');

  app.use(json());

  app.use(urlencoded({
    extended: false,
  }));

  app.use(cors());

  settingRoutes(app);

  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '..', '..', 'resources', 'public', 'index.html'));
  });

  return app;
};
