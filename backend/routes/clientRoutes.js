const express = require("express");
const clientController = require("./../controllers/clientControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    clientController.createClient
  )
  .get(clientController.getAllClients);

router
  .route("/:id")
  .get(clientController.getOneClient)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    clientController.updateClient
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    clientController.deleteClient
  );

module.exports = router;
