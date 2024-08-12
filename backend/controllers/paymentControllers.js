const axios = require("axios");
const Product = require("../models/productModel");

exports.checkout = async (req, res) => {
  const { productId, version } = req.body;
  const { user } = req;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (!user) {
      return res.status(401).send({ message: "User not authenticated" });
    }

    let amount;
    switch (version) {
      case "basic":
        amount = product.basic_version.price;
        break;
      case "open":
        amount = product.open_version.price;
        break;
      case "editable":
        amount = product.editable_version.price;
        break;
      default:
        return res.status(400).send({ message: "Invalid version type" });
    }

    const paymentData = {
      amount: amount,
      order_id: "ord",
      currency: "SAR",
      client: {
        name: user.name,
        phone: user.phone,
        email: user.email
      },
      description: `Payment for ${product.title_EN}`,
      success_url: "http://localhost:3000/",
      failure_url: "http://localhost:3000/login",
      metadata: { productId: product._id, version }
    };

    const response = await axios.post(
      "https://api.fatora.io/v1/payments/checkout",
      paymentData,
      {
        headers: {
          api_key: "E4B73FEE-F492-4607-A38D-852B0EBC91C9"
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error initiating checkout:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Error initiating checkout" });
  }
};
