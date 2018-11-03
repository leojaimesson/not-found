import http from 'http';
import express from './config/Express';
import mongodb from './config/Database';
import env from './config/Environment';

const app = express();

http.createServer(app).listen(app.get('port'), () => {
  console.info('%s listening at', app.get('port'), app.get('name'));
});

mongodb(env.mongodb.uri);
