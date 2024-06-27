const express = require("express");
const blogController = require("./../controllers/blogControllers");
const authController = require("./../controllers/authControllers");
const views = require("./../controllers/FactoryHandlers");

const router = express.Router();

router.route("/:category").get(blogController.postCategory);

router
  .route("/")
  .get(blogController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.createBlog
  );

router
  .route("/:id")
  .get(views.isAdmin, blogController.getOnePost)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.updateBlogImages,
    blogController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    blogController.deletePostImages,
    blogController.deletePost
  );

module.exports = router;
