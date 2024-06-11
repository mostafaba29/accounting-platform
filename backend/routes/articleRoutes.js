const express = require("express");
const articleController = require("./../controllers/articleControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    articleController.createArticle
  );

router
  .route("/:id")
  .get(articleController.getOneArticle)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    articleController.updateArticle
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    articleController.deleteArticle
  );

module.exports = router;
