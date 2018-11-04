import User from '../document/User';
import DuplicateUserError from '../exception/DuplicateUserError';
import UserNotFoundError from '../exception/UserNotFoundError';
import MissingPropertiesError from '../exception/MissingPropertiesError';

import helpers from '../helpers/document';

const verifyExistsUserRegistered = async user => (await User.findOne({
  email: user.email,
}).exec()) == null;

export default {
  save: async (user) => {
    if (!helpers.containsProperties(user, ['firstName', 'lastName', 'email', 'password'])) {
      throw new MissingPropertiesError('Missing properties in user!', helpers.missingProperties(user, ['firstName', 'lastName', 'email', 'password']));
    }
    if (!(await verifyExistsUserRegistered(user))) {
      throw new DuplicateUserError('User already registered on system!');
    }
    return User.create(user);
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
