const toTypesSolidWasteFiltersData = (types) => types.map((type) => ({
    text: type.name,
    value: type.name,
}));

export default {
    toTypesSolidWasteFiltersData,
}