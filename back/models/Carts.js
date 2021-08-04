const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  product_list: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Carts = mongoose.model("carts", cartSchema);

module.exports = Carts;
