import HttpStatus from 'http-status-codes';
import DataService from '../service/DataService';

const retrieveAllWasteDataByPeriod = async (request, response) => {
  try {
    const { period, interval } = request.query;
    const result = await DataService.getAllWasteDataByPeriod(period, interval);
    response.status(HttpStatus.OK).json(result);
  } catch (error) {
    response.status(error.statusCode).json(error);
  }
};

export default {
  retrieveAllWasteDataByPeriod,
};
