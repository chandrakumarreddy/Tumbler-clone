require("dotenv").config({ path: "variables.env" });
require("./models/db");
require("./controllers/helpers/google");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const app = express();

//middleware
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.secret, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//route imports
const baseRoutes = require("./controllers/baseRoutes");
const googleAuth = require("./controllers/googleAuth");
//routes
app.use("/", baseRoutes);
app.use("/auth/google", googleAuth);

//listening to server
app.listen(process.env.PORT, () => {
	console.log(`server is up and running at ${process.env.PORT}`);
});
