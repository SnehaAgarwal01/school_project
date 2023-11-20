const mongoose = require("mongoose");

const parentCredential = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Parent Credential", parentCredential);
