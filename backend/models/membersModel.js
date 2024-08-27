const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true
  },
  name_AR: {
    type: String,
    required: true,
    trim: true
  },
  name_EN: {
    type: String,
    required: true,
    trim: true
  },
  position_AR: {
    type: String,
    required: true
  },
  position_EN: {
    type: String,
    required: true
  },
  images: [String],
  brief_AR: {
    type: String,
    trim: true
  },
  brief_EN: {
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
