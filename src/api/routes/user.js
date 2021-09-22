const { Router } = require("express");
const AuthService = require("../../services/auth");
const AuthMiddleware = require("../middlewares/auth");

const route = Router();
module.exports = (app) => {
	app.use("/auth", route);

	route.post("/signup", async (req, res, next) => {
		try {
			const { user, token } = await AuthService.SignUp(req.body);
			return res.status(201).json({ user, token });
		} catch (error) {
			return res.status(400).send({ error: error.message });
		}
	});

	route.post("/signin", async (req, res, next) => {
		try {
			const { user, token } = await AuthService.SignIn(
				req.body.username,
				req.body.password
			);
			res.send({ user, token });
		} catch (error) {
			return res.status(400).send({ error: error.message });
		}
	});
	route.post("/signout", AuthMiddleware, async (req, res, next) => {
		try {
			req.user.tokens = [];
			await req.user.save();
			res.send();
		} catch {
			return res.status(500).send({ error: error.message });
		}
	});
};
