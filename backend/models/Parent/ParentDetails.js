const mongoose = require("mongoose");

const parentDetails = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  wardName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Parent Detail", parentDetails);
