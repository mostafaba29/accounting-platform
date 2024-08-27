const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
  intro_AR: {
    type: String,
    required: [true, "intro sentence is required"],
    trim: true
  },
  intro_EN: {
    type: String,
    required: [true, "intro sentence is required"],
    trim: true
  },
  serviceOne_AR: {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  serviceOne_EN: {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  serviceTwo_AR: {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  serviceTwo_EN: {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  serviceThree_AR: {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  serviceThree_EN: {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  }
});

const LandingPage = mongoose.model("LandingPage", landingPageSchema);

module.exports = LandingPage;
