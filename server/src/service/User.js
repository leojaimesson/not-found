import bcrypt from 'bcrypt'
import User from '../document/User'
import DuplicateUserError from '../exception/DuplicateUserError'
import HttpStatus from 'http-status-codes'

const verifyExistsUserRegistered = async (user) => {
	return (await User.findOne({"email": user.email}).exec()) != null
}

export default {
	save: async (user) => {
		if(!verifyExistsUserRegistered(user)) {
			return User.create({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: bcrypt.hashSync(user.password, 10)
			})
		}

		throw new DuplicateUserError("User already registered on system")
	}
}
