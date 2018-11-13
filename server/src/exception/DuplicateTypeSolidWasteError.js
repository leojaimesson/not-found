import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

export default class DuplicateTypeSolidWasteError extends ApiError {
  constructor(message) {
    super(message, HttpStatus.CONFLICT, DuplicateTypeSolidWasteError.name);
  }
}
