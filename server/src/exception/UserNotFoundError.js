import ApiError from './ApiError'
import HttpStatus from 'http-status-codes'

export default class UserNotFoundError extends ApiError {
	constructor(message) {
		super(message, HttpStatus.NOT_FOUND, UserNotFoundError.name)
	}
}
