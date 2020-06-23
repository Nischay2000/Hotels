var mongoose = require('mongoose');
var campgroundSchema = new mongoose.Schema({
	name: String,
	city: String,
	room: String,
	price: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ref'
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

module.exports = mongoose.model('Campground', campgroundSchema);
