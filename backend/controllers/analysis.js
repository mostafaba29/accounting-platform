const express = require("express");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
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
