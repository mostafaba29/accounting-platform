const express = require("express");
const paymentControllers = require("../controllers/paymentControllers");

const router = express.Router();

router.route("/checkout").post(paymentControllers.checkout);

module.exports = router;
