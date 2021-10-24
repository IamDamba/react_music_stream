const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const Newsletters = mongoose.model("newsletters", newsletterSchema);

module.exports = Newsletters;
