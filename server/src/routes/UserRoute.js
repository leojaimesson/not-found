import controller from '../controller/UserController'
import express from 'express'

export default (app) => {
	const router = express.Router();

	router.post('/', controller.save);
	router.get('/', controller.getByEmail);
	router.get('/', controller.getAll)

	app.use('/user', router)
}
