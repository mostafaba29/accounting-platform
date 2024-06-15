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
  document: {
    type: String,
    required: [true, "a file must have a name"]
  },
  price: {
    type: Number,
    required: [true, "a product must have a price"]
  },
  Sucessful_Purchases: Number,
  views: Number,
  images: [String],
  category: {
    type: String,
    enum: ["c1", "c2"]
  },
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
