import TypeSolidWaste from '../document/TypeSolidWaste';
import DuplicateTypeSolideWasted from '../exception/DuplicateTypeSolidWastedRegistered';

const verifyExistsTypeSolidWasteRegistered = async typeSolidWaste => (await TypeSolidWaste.findOne({
  name: typeSolidWaste.name,
}).exec()) == null;

export default {
  save: async (typeSolidWaste) => {
    if (await verifyExistsTypeSolidWasteRegistered(typeSolidWaste)) {

      return TypeSolidWaste.create(typeSolidWaste);
    }
    throw new DuplicateTypeSolideWasted('Type solid waste already registered on system!');
  },
};
