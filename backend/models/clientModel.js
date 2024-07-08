const mongoose = require("mongoose");

const clientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  images: [String],
  description: String
});

const Client = mongoose.model("Client", clientsSchema);

module.exports = Client;
