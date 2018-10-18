export default class ApiError extends Error {
	constructor(message, statusCode, name) {
		super()

		Error.captureStackTrace(this, this.constructor)

		this.name = name;

		this.message = message

		this.statusCode = statusCode
	}
}
