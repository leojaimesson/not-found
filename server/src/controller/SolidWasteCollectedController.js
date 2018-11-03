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
      const solidWastCollected = await service.save({
        typeWasted,
        quantityCollected,
        collectionDate,
      });
      response.status(HttpStatus.CREATED).json(solidWastCollected);
    } catch (error) {
      response.status(error.statusCode).json(error);
    }
  },
};
