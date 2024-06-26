const express = require("express");
const axios = require("axios");

const Product = require("./../models/productModel");

const router = express.Router();

router.post("/payment/checkout", async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const response = await axios.post(
      "https://api.fatora.io/v1/payments",
      {
        amount: product.price,
        currency: product.currency,
        description: product.name,
        success_url: "http://localost:3000/home",
        fail_url: "http://localost:3000/login"
      },
      {
        headers: {
          Authorization: `Bearer 72830519-1d24-47da-9ddf-faea88907c62`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ paymentUrl: response.data.payment_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
