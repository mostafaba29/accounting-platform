const axios = require("axios");
const Product = require("../models/productModel");

exports.checkout = async (req, res) => {
  const { productId, versionType } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const paymentData = {
      amount: product.basic_version.price,
      currency: "SAR",
      description: `Payment for ${product.title_EN}`,
      success_url: "http://localhost:3000/",
      failure_url: "http://localhost:3000/login",
      metadata: { productId: product._id, versionType }
    };

    const response = await axios.post(
      "https://maktapp.credit/v3/AddTransaction",
      paymentData,
      {
        headers: {
          Authorization: "Bearer 72830519-1d24-47da-9ddf-faea88907c62"
        }
      }
    );

    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};
