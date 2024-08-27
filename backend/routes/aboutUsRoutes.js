const express = require("express");
const aboutUsPageControllers = require("./../controllers/aboutUspageContentControllers");
const authController = require("./../controllers/authControllers");
const uploadMiddleware = require("../controllers/FactoryHandlers");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadMiddleware.uploadFiles,
    aboutUsPageControllers.createAboutUsPage
  )
  .get(aboutUsPageControllers.getAboutUsPage);

router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    aboutUsPageControllers.updateAboutUsPage
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    aboutUsPageControllers.deleteAboutUsPage
  );

module.exports = router;
