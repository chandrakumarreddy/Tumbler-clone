const mongoose = require("mongoose");
mongoose
	.connect(process.env.mongo_url)
	.then(() => console.log("connected successfully"))
	.catch(err => console.log(err));
require("./user");
require("./articles");
