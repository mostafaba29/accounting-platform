const User = require("../models/userModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Add a product version to the cart
exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, version } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const user = await User.findById(req.user.id);
  user.cart.push({ product: productId, version });
  await user.save({ validateBeforeSave: false });

  const userCart = await user.populate({
    path: "cart.product",
    select: `title_AR title_EN description_AR description_EN ${version}`
  });

  res.status(200).json({
    status: "success",
    data: {
      cart: userCart.cart
    }
  });
});

// Remove an item from the cart
exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId, version } = req.body;

  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(
    item => item.product.toString() !== productId || item.version !== version
  );
  await user.save({ validateBeforeSave: false });

  const userCart = await user.populate({
    path: "cart.product",
    select: `title_AR title_EN description_AR description_EN ${version}`
  });

  res.status(200).json({
    status: "success",
    data: {
      cart: userCart.cart
    }
  });
});

// Get the user's cart
exports.showCart = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "cart.product",
    select:
      "title_AR title_EN description_AR description_EN basic_version open_version editable_version"
  });

  res.status(200).json({
    status: "success",
    data: {
      cart: user.cart.map(item => ({
        product: {
          _id: item.product._id,
          title_AR: item.product.title_AR,
          title_EN: item.product.title_EN,
          description_AR: item.product.description_AR,
          description_EN: item.product.description_EN,
          [item.version]: item.product[item.version]
        }
      }))
    }
  });
});

// Handle checkout
exports.moveToPurchases = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("cart.product");

  user.cart.forEach(item => {
    user.purchases.push({
      product: item.product._id,
      version: item.version,
      file: item.product[item.version].document
    });
  });

  user.cart = [];
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      purchases: user.purchases
    }
  });
});
