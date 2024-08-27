const express = require("express");
const privacyPolicyPageControllers = require("./../controllers/privacyPolicyPageControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/FactoryHandlers");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    privacyPolicyPageControllers.createPrivacyPolicyPage
  )
  .get(privacyPolicyPageControllers.getPrivacyPolicyPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    privacyPolicyPageControllers.updatePrivacyPolicyPage
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    privacyPolicyPageControllers.deletePrivacyPolicyPage
  );

module.exports = router;
