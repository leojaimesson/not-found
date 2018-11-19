import TypeSolidWaste from '../document/TypeSolidWaste';
import InternalError from '../exception/InternalError';
import MissingPropertiesError from '../exception/MissingPropertiesError';
import TypeSolidWasteNotFoundError from '../exception/TypeSolidWasteNotFoundError';
import DuplicateTypeSolideWasteError from '../exception/DuplicateTypeSolidWasteError';

import helpers from '../helpers/document';

const verifyExistsTypeSolidWasteRegistered = async typeSolidWaste => (await TypeSolidWaste.findOne({
  name: typeSolidWaste.name,
}).exec()) == null;

export default {
  save: async (typeSolidWaste) => {
    try {
      if (!helpers.containsProperties(typeSolidWaste, ['name', 'description', 'recyclable', 'reutilable', 'color'])) {
        throw new MissingPropertiesError('Missing properties in type solid waste!', helpers.missingProperties(typeSolidWaste, ['name', 'description', 'recyclable', 'reutilable', 'color']));
      }
      if (await verifyExistsTypeSolidWasteRegistered(typeSolidWaste)) {
        return TypeSolidWaste.create(typeSolidWaste);
      }
      throw new DuplicateTypeSolideWasteError('Type solid waste already registered on system!');
    } catch (error) {
      throw new InternalError(error.message);
    }
  },

  retrieveAll: () => {
    try {
      return TypeSolidWaste.find().exec();
    } catch (error) {
      throw new InternalError(error.message);
    }
  },

  delete: async (id) => {
    try {
      const typeSolidWaste = await TypeSolidWaste.findByIdAndRemove(id).exec();
      if (typeSolidWaste != null) {
        return typeSolidWaste;
      }
      throw new TypeSolidWasteNotFoundError(`Type solid waste with id ${id} not found on system!`);
    } catch (error) {
      throw new InternalError(error.message);
    }
  },
};
