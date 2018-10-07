import controller from '../controller/UserController'

export default (app) => {
	app.post('/user', controller.save)
}
