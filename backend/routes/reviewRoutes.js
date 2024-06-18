const express = require("express");
const reviewController = require("./../controllers/reviewControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route("/").get(reviewController.getAllReviews);

router
  .route("/:id")
  .post(reviewController.setItemUserIds, reviewController.createReview)
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
