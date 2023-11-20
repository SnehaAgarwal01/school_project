const mongoose = require("mongoose");

const Queries = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Queries", Queries);
