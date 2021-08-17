const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  id_user: {
    type: Number,
    required: true,
  },
  id_cart: {
    type: Number,
    required: true,
  },
});

const Commands = mongoose.model("commands", commandSchema);

module.exports = Commands;
