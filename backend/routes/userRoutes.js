const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authControllers");
const cartController = require("../controllers/cartControllers");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

//PASSWORD AND USER SETTINGS
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.delete("/deleteMe", userController.deleteMe);

//CART OPERATIONS
router.post("/:userId/checkout", cartController.clearCart);
router.delete("/:userId/cart/:productId", cartController.removeFromCart);
router.get("/:userId/purchases", cartController.getPurchases);

router
  .route("/:userId/cart")
  .post(cartController.addToCart)
  .get(cartController.showCart);

//ADMIN OPERATIONS FOR USERS
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
