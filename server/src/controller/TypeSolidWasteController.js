import HttpStatus from 'http-status-codes'
import service from '../service/TypeSolidWasteService'

export default {
	save: async (request, response) => {
		try {
			const typeSolidWaste = await service
		} catch (error) {
			response.status(error.statusCode).json(error)
		}
	}
}


save: async (request, response) => {
	try {
		const user = await service.save({
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			email: request.body.email,
			password: request.body.password
		})

		user.password = undefined

		response.status(HttpStatus.CREATED).json(user)
	} catch (error) {
		response.status(error.statusCode).json(error)
	}
}
