const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  facebook: {
    type: String,
    validate: {
      validator: v => validator.isURL(v),
      message: "Invalid URL"
    }
  },
  x: {
    type: String,
    validate: {
      validator: v => validator.isURL(v),
      message: "Invalid URL"
    }
  },
  whatsapp: String,
  phone: {
    type: String,
    validate: {
      validator: v => validator.isMobilePhone(v),
      message: "Invalid phone number"
    }
  },
  email: {
    type: String,
    validate: {
      validator: v => validator.isEmail(v),
      message: "Invalid email"
    }
  },
  body: {
    type: String,
    required: true
  },
  members: {
    info: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model("Contact", contactSchema);
