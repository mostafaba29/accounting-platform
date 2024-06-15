const express = require("express");
const servicesControllers = require("./../controllers/servicesControllers");
const authController = require("../controllers/authControllers");
const analysis = require("../controllers/analysis");

const router = express.Router();

router.get(
  "/analysis",
  authController.protect,
  authController.restrictTo("admin"),
  analysis.websiteAnalysis
);

router
  .route("/")
  .get(servicesControllers.getAllServices)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    servicesControllers.uploadFileAndImages,
    servicesControllers.createService
  );

router
  .route("/:id")
  .get(servicesControllers.getOneService)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    servicesControllers.updateImages,
    servicesControllers.updateService
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    servicesControllers.deleteServiceImages,
    servicesControllers.deleteService
  );

module.exports = router;
