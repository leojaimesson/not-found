import HttpStatus from 'http-status-codes';
import DataService from '../service/DataService';

const retrieveAllWasteDataByPeriod = async (request, response) => {
  try {
    const { period, interval, idTypeSolidWaste } = request.query;
    const result = await DataService.getAllWasteDataByPeriod(period, interval, idTypeSolidWaste);
    response.status(HttpStatus.OK).json(result);
  } catch (error) {
    response.status(error.statusCode).json(error);
  }
};

const retrieveAllWasteDataByPeriodFull = async (request, response) => {
  try {
    const { period, interval, idTypeSolidWaste } = request.query;
    const result = await DataService.getAllWasteDataByPeriodFull(period, interval, idTypeSolidWaste);
    response.status(HttpStatus.OK).json(result);
  } catch (error) {
    response.status(error.statusCode).json(error);
  }
};

const retrieveWastesDataByPeriod = async (request, response) => {
  try {
    const { startDate, endDate, idTypeSolidWaste } = request.query;
    console.log(request.query);
    const result = await DataService.getWastesDataByPeriod(startDate, endDate, idTypeSolidWaste);
    response.status(HttpStatus.OK).json(result);
  } catch (error) {
    response.status(error.statusCode).json(error);
  }
};

const retrieveWastesDataByPeriodFull = async (request, response) => {
  try {
    const { startDate, endDate, idTypeSolidWaste } = request.query;
  console.log("AQUUUUUUUUUUUUUUUUUUUUUU", request.query);
    const result = await DataService.getWastesDataByPeriodFull(startDate, endDate, idTypeSolidWaste);
    response.status(HttpStatus.OK).json(result);
  } catch (error) {
    response.status(error.statusCode).json(error);
  }
};

const retrieveWasteDataByPeriod = async (request, response) => {
  try {
    const { period, interval, idTypeSolidWaste } = request.query;
    const result = await DataService.getWasteDataByPeriod(period, interval, idTypeSolidWaste);
    response.status(HttpStatus.OK).json(result);
  } catch (error) {
    response.status(error.statusCode).json(error);
  }
};

export default {
  retrieveAllWasteDataByPeriod,
  retrieveAllWasteDataByPeriodFull,
  retrieveWastesDataByPeriod,
  retrieveWastesDataByPeriodFull,
  retrieveWasteDataByPeriod,
};
