import {
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from 'date-fns';
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

const getAllWasteDataByPeriod = async (period, interval) => {
  try {
    const start = new Date();
    const end = subPeriod(start, period, interval);
    const types = await TypeSolidWaste.find();
    const result = [];

    for (const type of types) {
      const filtered = await SolidWasteCollected.find({
        typeWasted: type._id,
        collectionDate: { $gte: end, $lt: start },
      });
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

export default {
  getAllWasteDataByPeriod,
};
