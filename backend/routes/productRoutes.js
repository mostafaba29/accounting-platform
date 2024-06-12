const express = require("express");
const authControllers = require("./../controllers/authControllers");
const productControllers = require("./../controllers/productControllers");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.get("/download/:productId", productControllers.downloadFile);

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.uploadFileAndImages,
    productControllers.createProduct
  );

router
  .route("/:id")
  .get(productControllers.getOneProduct)
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.deleteProductFiles,
    productControllers.uploadFileAndImages,
    productControllers.updateFilesAndImages,
    productControllers.updateProduct
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.deleteProductFiles,
    productControllers.deleteProduct
  );

module.exports = router;
