var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  location: String,
  lat: Number,
  lng: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
});

module.exports = mongoose.model("Campground", campgroundSchema);
