import mongoose from 'mongoose';
import { log } from 'console';

mongoose.Promise = global.Promise;

export default (uri) => {
  log(uri);
  mongoose.connect(uri, {
    useNewUrlParser: true,
  });
  mongoose.set('useCreateIndex', true);
  mongoose.connection.on('connected', log);
  mongoose.connection.on('disconnected', log);
  mongoose.connection.on('error', log);
  mongoose.set('debug', true);
};
