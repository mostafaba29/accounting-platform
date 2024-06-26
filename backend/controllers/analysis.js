const catchAsync = require("./../utils/catchAsync");
const Service = require("../models/serviceModel");
const User = require("../models/userModel");
const BlogPost = require("../models/blogPostModel");
const Product = require("./../models/productModel");
const Review = require("./../models/reviewModel");

// getting the total number of all models available
exports.websiteAnalysis = catchAsync(async (req, res) => {
  const servicesCount = await Service.countDocuments();
  const usersCount = await User.countDocuments();
  const blogPostsCount = await BlogPost.countDocuments();
  const productsCount = await Product.countDocuments();
  const reviewsCount = await Review.countDocuments();

  res.status(200).json({
    status: "success",
    data: {
      servicesCount,
      usersCount,
      blogPostsCount,
      productsCount,
      reviewsCount
    }
  });
});

// getting the latest 4 blogs, 4 featured services, most successfully purchased products
exports.landingPageContent = catchAsync(async (req, res) => {
  // Fetch last 4 blogs
  const latestBlogs = await BlogPost.find()
    .sort({ createdAt: -1 })
    .limit(4);

  // Fetch featured 4 rated services
  let featuredServices = await Service.find()
    .sort({ rating: -1 })
    .limit(4);
  if (featuredServices.length === 0) {
    featuredServices = await Service.find()
      .sort({ createdAt: -1 })
      .limit(4);
  }

  // fetch most successfully purchased
  let bestSellingProducts = await Product.find({
    Sucessful_Purchases: -1
  }).limit(6);
  if (bestSellingProducts.length === 0) {
    bestSellingProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6);
  }

  // Return all data as a single JSON response
  res.status(200).json({
    latestBlogs,
    featuredServices,
    bestSellingProducts
  });
});
