const User = require("../models/user");

class AuthService {
	async SignUp(body) {
		try {
			const user = new User(body);
			const token = await user.generateAuthToken();
			await user.save();
			return { user, token };
		} catch (error) {
			throw error;
		}
	}
	async SignIn(username, password) {
		try {
			const user = await User.findByCredentials(username, password);
			const token = await user.generateAuthToken();
			return { user, token };
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new AuthService();
