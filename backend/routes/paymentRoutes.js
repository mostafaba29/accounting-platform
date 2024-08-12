const express = require("express");
const paymentControllers = require("../controllers/paymentControllers");
const authController = require("../controllers/authControllers");

const router = express.Router();

router
  .route("/checkout")
  .post(authController.protect, paymentControllers.checkout);

module.exports = router;
