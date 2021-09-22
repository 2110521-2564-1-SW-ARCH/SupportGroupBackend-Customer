const dotenv = require("dotenv").config();

if (dotenv.error) {
	throw dotenv.error;
}
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
	port: process.env.PORT || parseInt(process.env.PORT, 10) || 3000,
	databaseURL: process.env.MONGODB_URI,
	jwtSecret: process.env.JWT_SECRET,
};
