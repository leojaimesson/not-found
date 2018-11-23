import moment from 'moment';

const toTags = (typeSolidWaste) => {
    const tags = [];
    if(typeSolidWaste.recyclable) {
        tags.push('recyclable');
    }
    if(typeSolidWaste.reutilable) {
        tags.push('reutilable');
    }
    return tags;
}

const toUsersListData = (users) => users.map((user) => ({
    key: user._id,
    name: user.firstName,
    email: user.email
}));

const toTypesSolidWasteData = (typesSolidWaste) => typesSolidWaste.map((typeSolidWaste) => ({
    key: typeSolidWaste._id,
    name: typeSolidWaste.name,
    description: typeSolidWaste.description,
    tags: toTags(typeSolidWaste)
}));

const toSolidWasteCollectedData = (solidWasteCollected) => solidWasteCollected.map((solidWasteCollected) => ({
    key: solidWasteCollected._id,
    typeWasted: solidWasteCollected.typeWasted.name,
    quantityCollected: solidWasteCollected.quantityCollected,
    collectionDate: moment(new Date(solidWasteCollected.collectionDate)).format('DD/MM/YYYY'),
}));

export default {
    toUsersListData,
    toTypesSolidWasteData,
    toSolidWasteCollectedData,
    toTags,
}