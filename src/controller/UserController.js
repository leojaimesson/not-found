import HttpStatus from 'http-status-codes';
import service from '../service/UserService';

export default {
  save: async (request, response) => {
    try {
      const userBody = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
      };
      const user = await service.save(userBody);
      user.password = undefined;
      response.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },

  getByEmail: async (request, response, next) => {
    if (!request.query.email) {
      next();
    }
    try {
      const { email } = request.query;
      const user = await service.retrieveByEmail(email);
      response.status(HttpStatus.ACCEPTED).json(user);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },

  getAll: async (request, response, next) => {
    if (request.query.email) {
      next();
    }
    try {
      const users = await service.retrieveAll();
      response.status(HttpStatus.ACCEPTED).json(users);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },

  deleteById: async (request, response, next) => {
    try {
      if (!request.query.id) {
        next();
      }
      const { id } = request.query;
      const user = await service.delete(id);
      response.status(HttpStatus.OK).json(user);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },
};
