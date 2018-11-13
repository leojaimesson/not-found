const toUsersListData = (users) => users.map((user) => ({
    key: user._id,
    name: user.firstName,
    email: user.email
}));

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

const toTypesSolidWasteData = (typesSolidWaste) => typesSolidWaste.map((typeSolidWaste) => ({
    key: typeSolidWaste._id,
    name: typeSolidWaste.name,
    description: typeSolidWaste.description,
    tags: toTags(typeSolidWaste)
}));;

export default {
    toUsersListData,
    toTypesSolidWasteData,
    toTags,
}