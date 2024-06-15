const express = require("express");
const blogController = require("./../controllers/blogControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router
  .route("/")
  .get(blogController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.uploadFileAndImages,
    blogController.createPost
  );

router
  .route("/:id")
  .get(blogController.getOnePost)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.updateImages,
    blogController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.deletePostImages,
    blogController.deletePost
  );

module.exports = router;
