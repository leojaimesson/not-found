const toSolidWasteCollectedData = (value) =>  {
    const result = [];
    result.push(value.typeWasted);
    result.push(value.quantityCollected);
    result.push(value.collectionDate);
    return result;
};

export default {
    toSolidWasteCollectedData,
}