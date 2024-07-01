const catchAsync = require("../utils/catchAsync");
const Consultation = require("../models/consultationModel");
const User = require("../models/userModel");
const Blog = require("../models/blogPostModel");
const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

// getting the total number of all models available
exports.websiteAnalysis = catchAsync(async (req, res) => {
  const usersCount = await User.countDocuments();
  const blogsCount = await Blog.countDocuments();
  const reviewsCount = await Review.countDocuments();
  const productsCount = await Product.countDocuments();
  const consultsCount = await Consultation.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      consultsCount,
      usersCount,
      blogsCount,
      productsCount,
      reviewsCount
    }
  });
});

// getting the latest 4 blogs, 4 featured services, most successfully purchased products
exports.landingPageContent = catchAsync(async (req, res) => {
  //latest 4 blogs
  const latestBlogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(4);

  //latest 4 products
  let topRatedProducts = await Product.find()
    .sort({ rating: -1 })
    .limit(4);
  if (topRatedProducts.length === 0) {
    topRatedProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(4);
  }

  // latest 4 consults
  let bestConsults = await Consultation.find({
    Sucessful_Purchases: -1
  }).limit(6);
  if (bestConsults.length === 0) {
    bestConsults = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6);
  }

  // Return all data as a single JSON response
  res.status(200).json({
    latestBlogs,
    topRatedProducts,
    bestConsults
  });
});
