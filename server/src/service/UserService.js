import User from '../document/User';
import DuplicateUserError from '../exception/DuplicateUserError';
import UserNotFoundError from '../exception/UserNotFoundError';

const verifyExistsUserRegistered = async user => (await User.findOne({
  email: user.email,
}).exec()) == null;

export default {
  save: async (user) => {
    if (await verifyExistsUserRegistered(user)) {
      return User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
    }
    throw new DuplicateUserError('User already registered on system!');
  },

  retrieveByEmail: async (email) => {
    const user = await User.findOne({ email }).exec();
    if (user != null) {
      return user;
    }
    throw new UserNotFoundError(`User with email ${email} not found on system!`);
  },

  retrieveAll: () => User.find().exec(),
};
