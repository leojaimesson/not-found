import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

export default class DuplicateUserError extends ApiError {
  constructor(message) {
    super(message, HttpStatus.CONFLICT, DuplicateUserError.name);
  }
}
