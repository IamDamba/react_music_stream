const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  id_track: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
