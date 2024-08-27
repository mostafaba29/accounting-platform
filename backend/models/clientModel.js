const mongoose = require("mongoose");

const clientsSchema = new mongoose.Schema({
  name_AR: {
    type: String,
    required: true
  },
  name_EN: {
    type: String,
    required: true
  }
});

const Client = mongoose.model("Client", clientsSchema);

module.exports = Client;
