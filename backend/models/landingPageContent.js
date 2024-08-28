const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: [true, "Service icon is required"]
  },
  title_AR: {
    type: String,
    required: [true, "Service title in Arabic is required"],
    trim: true
  },
  title_EN: {
    type: String,
    required: [true, "Service title in English is required"],
    trim: true
  },
  description_AR: {
    type: String,
    required: [true, "Service description in Arabic is required"],
    trim: true
  },
  description_EN: {
    type: String,
    required: [true, "Service description in English is required"],
    trim: true
  }
});

const landingPageSchema = new mongoose.Schema({
  intro_AR: {
    type: String,
    required: [true, "Intro sentence in Arabic is required"],
    trim: true
  },
  intro_EN: {
    type: String,
    required: [true, "Intro sentence in English is required"],
    trim: true
  },
  services: [serviceSchema]
});

const LandingPage = mongoose.model("LandingPage", landingPageSchema);

module.exports = LandingPage;
