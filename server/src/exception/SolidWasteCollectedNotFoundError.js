import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

export default class SolidWasteCollectedNotFoundError extends ApiError {
  constructor(message) {
    super(message, HttpStatus.NOT_FOUND, SolidWasteCollectedNotFoundError.name);
  }
}
