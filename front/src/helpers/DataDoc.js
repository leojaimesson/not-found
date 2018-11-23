import moment from 'moment';

const toSolidWasteCollectedData = (solidWasteCollected) => solidWasteCollected.map((solidWasteCollected) => {
    const result = [];
    result.push(solidWasteCollected.typeWasted.name);
    result.push(solidWasteCollected.quantityCollected)
    result.push(moment(new Date(solidWasteCollected.collectionDate)).format('DD/MM/YYYY'))
    return result;
});

export default {
    toSolidWasteCollectedData,
}