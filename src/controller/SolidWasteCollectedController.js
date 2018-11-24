import HttpStatus from 'http-status-codes';
import service from '../service/SolidWasteCollectedService';

export default {
  save: async (request, response) => {
    try {
      const {
        typeWasted,
        quantityCollected,
        collectionDate,
      } = request.body;
      console.log(request.body);

      const solidWasteCollected = await service.save({
        typeWasted,
        quantityCollected,
        collectionDate,
      });
      response.status(HttpStatus.CREATED).json(solidWasteCollected);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },

  getAll: async (request, response) => {
    try {
      const solidWasteCollected = await service.retrieveAll();
      response.status(HttpStatus.ACCEPTED).json(solidWasteCollected);
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
      const solidWasteCollected = await service.delete(id);
      response.status(HttpStatus.OK).json(solidWasteCollected);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },
};
