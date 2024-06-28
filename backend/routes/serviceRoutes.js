const express = require("express");
const servicesControllers = require("./../controllers/servicesControllers");
const authController = require("../controllers/authControllers");

const router = express.Router();

// router.route("/:category").get(servicesControllers.serviceCategory);

router
  .route("/")
  .get(servicesControllers.getAllServices)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    servicesControllers.createService
  );

router
  .route("/:id")
  .get(servicesControllers.getOneService)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    servicesControllers.updateServiceImages,
    servicesControllers.updateService
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    servicesControllers.deleteServiceImages,
    servicesControllers.deleteService
  );

module.exports = router;
