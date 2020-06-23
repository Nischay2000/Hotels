var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
  name: String,
  city: String,
  image: String,
  description: String,
  rooms: {
    normalRoom: {
      picture: String,
      price: String,
    },
    deluxeRoom: {
      picture: String,
      price: String,
    },
    superDeluxRoom: {
      picture: String,
      price: String,
    },
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ref",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Campground", campgroundSchema);
