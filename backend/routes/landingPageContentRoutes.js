const express = require("express");
const landingPageContentControllers = require("./../controllers/landingPageContentControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    landingPageContentControllers.createLandingPage
  )
  .get(landingPageContentControllers.getLandingPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    landingPageContentControllers.updateLandingPage
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    landingPageContentControllers.deleteLandingPage
  );

module.exports = router;
