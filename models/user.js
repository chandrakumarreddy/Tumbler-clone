const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	googleId: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	articles: {
		type: Schema.Types.ObjectId,
		ref: "Article"
	},
	following: [String],
	followers: [String],
	joined: {
		type: Date,
		default: Date.now
	}
});
mongoose.model("User", userSchema);
