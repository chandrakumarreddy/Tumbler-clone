const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	tags: {
		type: [String],
		required: true
	}
});
mongoose.model("Article", articleSchema);
