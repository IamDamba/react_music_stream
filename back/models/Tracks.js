const mongoose = require("mongoose");

const tracksSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  image: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  bpm: {
    type: String,
    require: true,
  },
  tag: {
    type: String,
    require: true,
  },
});

const Tracks = mongoose.model("tracks", tracksSchema);

module.exports = Tracks;
