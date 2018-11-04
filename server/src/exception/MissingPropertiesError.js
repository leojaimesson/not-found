import HttpStatus from 'http-status-codes';
import ApiError from './ApiError';

export default class MissingPropertiesError extends ApiError {
  constructor(message, missingsProperties) {
    super(message, HttpStatus.BAD_REQUEST, MissingPropertiesError.name);
    this.missings = missingsProperties;
  }
}
