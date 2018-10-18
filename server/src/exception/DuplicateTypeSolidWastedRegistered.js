import ApiError from './ApiError'
import HttpStatus from 'http-status-codes'

export default class DuplicateTypeSolidWasteError extends ApiError {
	constructor(message) {
		super(message, HttpStatus.CONFLICT, DuplicateTypeSolidWasteError.name)
	}
}
