import ApiError from './ApiError'
import HttpStatus from 'http-status-codes'

export default class DuplicateUserError extends ApiError {
	constructor(message) {
		super(message, HttpStatus.CONFLICT, DuplicateUserError.name)
	}
}
