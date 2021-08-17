const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Members = mongoose.model("products", memberSchema);

module.exports = Members;
