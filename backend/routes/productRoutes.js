const express = require("express");
const authControllers = require("./../controllers/authControllers");
const productControllers = require("./../controllers/productControllers");
const reviewRouter = require("./reviewRoutes");
const views = require("./../controllers/FactoryHandlers");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.get("/download/:productId", productControllers.downloadFile);

router.route("/:category").get(productControllers.productCategory);

router
  .route("/")
  .get(views.isAdmin, productControllers.getAllProducts)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.createProduct
  );

router
  .route("/:id")
  .get(productControllers.getOneProduct)
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.updateProductFiles,
    productControllers.updateProduct
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.deleteProductFiles,
    productControllers.deleteProduct
  );

module.exports = router;
