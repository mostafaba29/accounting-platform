const express = require("express");
const packageControllers = require("./../controllers/packageControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();
router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    packageControllers.createPackage
  )
  .get(packageControllers.getAllPackages);

router
  .route("/:id")
  .get(packageControllers.getOnePackage)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    packageControllers.updatePackage
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    packageControllers.deletePackage
  );

module.exports = router;
