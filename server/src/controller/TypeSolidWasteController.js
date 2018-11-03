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
};
