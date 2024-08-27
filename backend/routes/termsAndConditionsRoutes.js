const express = require("express");
const termsAndConditionsPageControllers = require("./../controllers/termsAndConditionsPageControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/FactoryHandlers");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    termsAndConditionsPageControllers.createTermsAndConditionsPage
  )
  .get(termsAndConditionsPageControllers.getTermsAndConditionsPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    termsAndConditionsPageControllers.updateTermsAndConditionsPage
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    termsAndConditionsPageControllers.deleteTermsAndConditionsPage
  );

module.exports = router;
