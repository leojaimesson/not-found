import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

export default class UserNotFoundError extends ApiError {
  constructor(message) {
    super(message, HttpStatus.NOT_FOUND, UserNotFoundError.name);
  }
}
