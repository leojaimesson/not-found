import http, { request } from "http"
import express from './config/express'
import mongodb from './config/database'
import env from './config/environment'

const app = express()

http.createServer(app).listen(app.get('port'), () => {
	console.info('%s listening at', app.get('port'), app.get('name'))
})

mongodb(env.mongodb.uri)
