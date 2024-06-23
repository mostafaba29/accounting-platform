const express = require("express");
const reviewController = require("./../controllers/reviewControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router({ mergeParams: true });

router.route("/").get(reviewController.getAllReviews);

router
  .route("/:id")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.setItemUserIds,
    reviewController.createReview
  )
  .get(reviewController.getReview)
  .patch(
    authController.protect,
    authController.restrictTo("user, admin"),
    reviewController.updateReview
  )
  .delete(
    authController.protect,
    authController.restrictTo("user, admin"),
    reviewController.deleteReview
  );

module.exports = router;
