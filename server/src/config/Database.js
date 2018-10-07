import mongoose from 'mongoose'
import { log } from 'console'

export default (uri) => {
	console.log(uri)
	mongoose.connect(uri, { useNewUrlParser: true })
	mongoose.connection.on('connected', log)
	mongoose.connection.on('disconnected', log)
	mongoose.connection.on('error', log)
	mongoose.set('debug', true)
}
