const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const user = await User.findById(userId);

  if (!user.cart.some(item => item.product.toString() === productId)) {
    user.cart.push({ product: productId });
  }

  await user.save();
  res.status(200).json({ status: "success", data: user.cart });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { userId, productId } = req.params;
  const user = await User.findById(userId);

  user.cart = user.cart.filter(item => item.product.toString() !== productId);
  await user.save();

  res.status(200).json({ status: "success", data: user.cart });
});

exports.showCart = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  res.status(200).json({ status: "success", data: user.cart });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { cart } = req.body;

  const user = await User.findById(userId).populate("cart.product");

  // Move items from cart to purchases
  const purchases = cart.map(item => {
    const productVersion = item.version;
    return { product: item.product._id, version: productVersion };
  });

  user.purchases = [...user.purchases, ...purchases];

  // Clear the cart
  user.cart = [];

  await user.save();
  res.status(200).json({ status: "success", data: user.purchases });
});

exports.getPurchases = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate({
    path: "purchases.product",
    select: "title_AR title_EN basic_version open_version editable_version"
  });

  res.status(200).json({ status: "success", data: user.purchases });
});
