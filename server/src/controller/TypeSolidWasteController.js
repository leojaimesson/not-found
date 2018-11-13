import HttpStatus from 'http-status-codes';
import service from '../service/TypeSolidWasteService';

export default {
  save: async (request, response) => {
    try {
      const {
        name,
        description,
        recyclable,
        reutilable,
      } = request.body;
      const typeSolidWaste = await service.save({
        name,
        description,
        recyclable,
        reutilable,
      });
      response.status(HttpStatus.CREATED).json(typeSolidWaste);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },

  getAll: async (request, response) => {
    try {
      const typesSolidWaste = await service.retrieveAll();
      response.status(HttpStatus.ACCEPTED).json(typesSolidWaste);
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
      const typeSolidWaste = await service.delete(id);
      response.status(HttpStatus.OK).json(typeSolidWaste);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },
};
