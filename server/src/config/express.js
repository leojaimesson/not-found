import express from 'express'
import env from './environment'
import { json, urlencoded } from 'body-parser'
import path from 'path'

export default () => {
	const app = express()

	app.set('port', env.server.port)

	app.set('name', 'Not Found API')

	app.use(json())

	app.use(urlencoded({
		extended: false
	}))

	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, '..', '..', 'resources', 'public', 'index.html'))
	})

	return app
}
