import SolidWasteCollected from '../document/SolidWasteCollected';
import InternalError from '../exception/InternalError';
import MissingPropertiesError from '../exception/MissingPropertiesError';
import SolidWasteCollectedNotFoundError from '../exception/SolidWasteCollectedNotFoundError';

import helpers from '../helpers/document';

export default {
  save: async (solidWasteCollected) => {
    try {
      if (!helpers.containsProperties(solidWasteCollected, ['typeWasted', 'quantityCollected'])) {
        throw new MissingPropertiesError('Missing properties in solid waste collected!', helpers.missingProperties(solidWasteCollected, ['typeWasted', 'quantityCollected']));
      }
      const create = await SolidWasteCollected.create(solidWasteCollected);
      return SolidWasteCollected.findById(create._id).populate('typeWasted').exec();
    } catch (error) {
      throw new InternalError(error.message);
    }
  },

  retrieveAll: async () => {
    try {
      const result = await SolidWasteCollected.find().populate('typeWasted').exec();
      return result;
    } catch (error) {
      throw new InternalError(error.message);
    }
  },

  delete: async (id) => {
    try {
      const solidWasteCollected = await SolidWasteCollected.findByIdAndRemove(id).exec();
      if (solidWasteCollected != null) {
        return solidWasteCollected;
      }
      throw new SolidWasteCollectedNotFoundError(`Type solid waste with id ${id} not found on system!`);
    } catch (error) {
      throw new InternalError(error.message);
    }
  },
};
