import HttpStatus from 'http-status-codes'
import service from '../service/User'
import User from '../dto/User'

export default {
	save: async (request, response) => {
		try {
			const user = await service.save({
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				email: request.body.email,
				password: request.body.password
			})

			response.status(HttpStatus.CREATED).json(new User(user))
		} catch (error) {
			response.status(error.statusCode).json(error)
		}
	}
}
