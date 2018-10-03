import { config } from 'dotenv'

if(process.env.NODE_ENV != 'production') {
	config()
}

export default {
	server: {
		port: process.env.SERVER_PORT
	},
	mongodb: {
		uri: process.env.MONGO_URI
	}
}
