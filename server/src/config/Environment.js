import { config } from 'dotenv';

config();

const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_PM2_INSTANCES = 1;
const DEFAULT_PM2_AUTORESTART = true;
const DEFAULT_PM2_MAX_MEMORY_RESTART = '1G';

export default {
  server: {
    port: process.env.SERVER_PORT || DEFAULT_SERVER_PORT,
  },
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  pm2: {
    instances: process.env.PM2_INSTANCES || DEFAULT_PM2_INSTANCES,
    autorestar: process.env.PM2_AUTORESTART || DEFAULT_PM2_AUTORESTART,
    maxMemoryRestart: process.env.PM2_MAX_MEMORY_RESTART || DEFAULT_PM2_MAX_MEMORY_RESTART,
  },
};
