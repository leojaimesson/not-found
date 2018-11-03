import HttpStatus from 'http-status-codes';
import service from '../service/UserService';

export default {
  save: async (request, response) => {
    try {
      const user = await service.save({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
      });

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

  getAll: async (request, response) => {
    const users = await service.retrieveAll();
    response.status(HttpStatus.ACCEPTED).json(users);
  },
};
