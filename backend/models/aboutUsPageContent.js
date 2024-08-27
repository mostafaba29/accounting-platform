const mongoose = require("mongoose");

const aboutUsPageSchema = new mongoose.Schema({
  coverImage: {
    type: String,
    required: true
  },
  aboutUs_AR: {
    type: String,
    required: [true, "aboutUs sentence is required"],
    trim: true
  },
  aboutUs_EN: {
    type: String,
    required: [true, "aboutUs sentence is required"],
    trim: true
  },
  ourVision_AR: {
    type: String,
    required: [true, "ourVision description is required"],
    trim: true
  },
  ourVision_EN: {
    type: String,
    required: [true, "ourVision description is required"],
    trim: true
  },
  message_AR: {
    type: String,
    required: [true, "message description is required"],
    trim: true
  },
  message_EN: {
    type: String,
    required: [true, "message description is required"],
    trim: true
  },
  goals_AR: {
    type: String,
    required: [true, "goals description is required"],
    trim: true
  },
  goals_EN: {
    type: String,
    required: [true, "goals description is required"],
    trim: true
  }
});

const AboutUsPage = mongoose.model("AboutUsPage", aboutUsPageSchema);

module.exports = AboutUsPage;
