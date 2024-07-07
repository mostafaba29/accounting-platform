const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  images: [String],
  brief: {
    type: String,
    trim: true
  },
  isFounder: {
    type: Boolean,
    default: false
  }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
