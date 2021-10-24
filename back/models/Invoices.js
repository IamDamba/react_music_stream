const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  subtotal: {
    type: String,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  insurance: {
    type: String,
    required: true,
  },
  handling_fee: {
    type: String,
    required: true,
  },
  shipping_discount: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  create_time: {
    type: String,
    required: true,
  },
});

const Invoices = mongoose.model("invoices", invoiceSchema);

module.exports = Invoices;
