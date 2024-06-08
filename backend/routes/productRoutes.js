const express = require("express");
const authControllers = require("./../controllers/authControllers");
const productControllers = require("./../controllers/productControllers");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.post(
  "/upload-file",
  productControllers.fileUpload.single("file"),
  (req, res) => {
    try {
      res.send("File uploaded successfully.");
    } catch (err) {
      res.status(400).send("Error uploading file.");
    }
  }
);

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.uploadProductImages,
    productControllers.resizeProductImages,
    productControllers.createProduct
  );

router
  .route("/:id")
  .get(productControllers.getOneProduct)
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.uploadProductImages,
    productControllers.resizeProductImages,
    productControllers.updateProduct
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    productControllers.deleteProduct
  );

module.exports = router;
