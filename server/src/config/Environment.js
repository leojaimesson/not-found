import { config } from 'dotenv'

if (process.env.NODE_ENV != 'production') {
	config()
}

const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_PM2_INSTANCES = 1;
const DEFAULT_PM2_AUTORESTART = true;
const DEFAULT_PM2_MAX_MEMORY_RESTART = '1G';

export default {
	server: {
		port: process.env.SERVER_PORT || DEFAULT_SERVER_PORT
	},
	mongodb: {
		uri: process.env.MONGO_URI
	},
	pm2: {
		instances: process.env.INSTANCES || DEFAULT_PM2_INSTANCES,
		autorestar: process.env.AUTORESTART || DEFAULT_PM2_AUTORESTART,
		maxMemoryRestart: process.env.MAX_MEMORY_RESTART || DEFAULT_PM2_MAX_MEMORY_RESTART
	}
}
