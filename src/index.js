const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const configs = require("./configs");
const auth = require("./api/routes/user");
const app = express();

mongoose.connect(configs.databaseURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
	res.send("Hello World!");
});
auth(app);
app.listen(configs.port, () =>
	console.log("Server is up on port " + configs.port)
);
