import HttpStatus from 'http-status-codes';
import service from '../service/TypeSolidWasteService';

export default {
  save: async (request, response) => {
    try {
      const typeSolidWaste = await service.save({
        name: request.body.name,
        description: request.body.description,
        recyclable: request.body.recyclable,
        reutilable: request.body.reutilable,
      });
      response.status(HttpStatus.CREATED).json(typeSolidWaste);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },
};
