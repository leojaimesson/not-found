import {
  subDays,
  subWeeks,
  subMonths,
  subYears,
  startOfDay,
  endOfDay
} from 'date-fns';

import moment from 'moment-timezone';
import TypeSolidWaste from '../document/TypeSolidWaste';
import SolidWasteCollected from '../document/SolidWasteCollected';
import InternalError from '../exception/InternalError';

const subPeriod = (start, period, interval) => {
  switch (period) {
    case 'DAY':
      return subDays(start, interval);
    case 'WEEK':
      return subWeeks(start, interval);
    case 'MONTH':
      return subMonths(start, interval);
    case 'YEAR':
      return subYears(start, interval);
    default:
      return start;
  }
};

const getAllWasteDataByPeriod = async (period, interval, idTypeSolidWaste) => {
  try {
    const end = new Date();
    const start = subPeriod(end, period, interval);
    const types = idTypeSolidWaste ? await TypeSolidWaste.find({ _id: idTypeSolidWaste }) : await TypeSolidWaste.find();
    const result = [];

    for (const type of types) {
      const filtered = await SolidWasteCollected.find({
        typeWasted: type._id,
        collectionDate: { $gte: start, $lt: end },
      }).sort('collectionDate').exec();
      result.push({
        name: type.name,
        color: type.color,
        data: filtered.reduce((acc, current) => acc + current.quantityCollected, 0),
      });
    };

    return result;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

const getAllWasteDataByPeriodFull = async (period, interval, idTypeSolidWaste) => {
  try {
    const end = new Date();
    const start = subPeriod(end, period, interval);
    const types = idTypeSolidWaste ? await TypeSolidWaste.find({ _id: idTypeSolidWaste }) : await TypeSolidWaste.find();
    const result = [];

    for (const type of types) {
      const filtered = await SolidWasteCollected.find({
        typeWasted: type._id,
        collectionDate: { $gte: start, $lt: end },
      }).sort('collectionDate').exec();
      result.push({
        name: type.name,
        color: type.color,
        data: filtered,
      });
    };

    return result;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

const getWastesDataByPeriod = async (startDate, endDate, idTypeSolidWaste) => {
  try {
    const types = idTypeSolidWaste ? await TypeSolidWaste.find({ _id: idTypeSolidWaste }) : await TypeSolidWaste.find();
    const result = [];

    console.log('start', startDate);
    for (const type of types) {
      const filtered = await SolidWasteCollected.find({
        typeWasted: type._id,
        collectionDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
      }).sort('collectionDate').exec();
      result.push({
        name: type.name,
        color: type.color,
        data: filtered.reduce((acc, current) => acc + current.quantityCollected, 0),
      });
    };

    return result;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

const getWastesDataByPeriodFull = async (startDate, endDate, idTypeSolidWaste) => {
  try {
    console.log("AQUIIII",startDate, endDate, idTypeSolidWaste);
    const types = idTypeSolidWaste ? await TypeSolidWaste.find({ _id: idTypeSolidWaste }) : await TypeSolidWaste.find();
    const result = [];
    for (const type of types) {
      const filtered = await SolidWasteCollected.find({
        typeWasted: type._id,
        collectionDate: { $gte: new Date(startDate), $lt: new Date(endDate) },
      }).populate('typeWasted').sort('collectionDate').exec();
      result.push({
        name: type.name,
        color: type.color,
        data: filtered,
      });
    };
    return result;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

const getWasteDataByPeriod = async (period, interval, idTypeSolidWaste) => {
  try {
    const now = new Date();
    const type = await TypeSolidWaste.findById(idTypeSolidWaste).exec();
    const result = [];

    for (let i = 1; i <= interval; i++) {

      console.log("Now", now);
      const date = subPeriod(now, period, i);
      const start = subPeriod(now, period, i);
      const end = now;
      console.log("Start", start);
      console.log("End", end);
      const filtered = await SolidWasteCollected.find({
        typeWasted: type._id,
        collectionDate: { $gte: start, $lte: end },
      }).sort('collectionDate').exec();
      console.log(filtered)
      result.push({
        name: `${start.getDay() + 1}/${start.getMonth() + 1}/${start.getYear()}`,
        color: type.color,
        data: filtered.reduce((acc, current) => acc + current.quantityCollected, 0),
      });
    }
    return result;
  } catch (error) {
    throw new InternalError(error.message);
  }
};

export default {
  getAllWasteDataByPeriod,
  getAllWasteDataByPeriodFull,
  getWastesDataByPeriod,
  getWastesDataByPeriodFull,
  getWasteDataByPeriod,
};
