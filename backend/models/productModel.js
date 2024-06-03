const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a product must have a name"],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required: [true, "a product must have a description"]
  },
  file_name: {
    type: String,
    required: [true, "a file must have a name"]
  },
  price: Number,
  images: [String],
  coverImage: {
    type: String,
    required: [true, "a product must have a cover image"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
