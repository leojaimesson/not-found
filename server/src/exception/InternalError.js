import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

export default class InternalError extends ApiError {
  constructor(message) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, InternalError.name);
  }
}
