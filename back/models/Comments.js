const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  track_id: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const Comments = mongoose.model("comments", commentsSchema);

module.exports = Comments;
