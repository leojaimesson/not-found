const toUsersListData = (users) => users.map((user) => ({
    key: user._id,
    name: user.firstName,
    email: user.email
}));

const toTypesSolidWastData = (typesSolidWast) => typesSolidWast.map((typeSolidWast) => ({}));;

export default {
    toUsersListData,
    toTypesSolidWastData,
}