const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const configs = require("./configs");
const cors = require("cors");
const auth = require("./api/routes/user");
const app = express();

const whitelist = ["http://localhost:3000"];
const corsOption = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOption));

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
