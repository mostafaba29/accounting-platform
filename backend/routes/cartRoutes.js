const express = require("express");
const authController = require("../controllers/authControllers");
const cartController = require("../controllers/cartControllers");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(cartController.addToCart)
  .get(cartController.showCart);

router.delete("/:productId", cartController.removeFromCart);

router.post("/clearCart", cartController.moveToPurchases);

module.exports = router;
