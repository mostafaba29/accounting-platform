const multer = require("multer");
const fs = require("fs");
const path = require("path");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const BlogPost = require("../models/blogPostModel");
const factory = require("./FactoryHandlers");

const now = new Date();
const formattedDate = `${now.getDate()}-${now.getMonth() +
  1}-${now.getFullYear()}`;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, "./../frontend/public/imgs/blogs");
    } else {
      cb(
        new AppError("Unsupported file type! Please upload only images.", 400),
        false
      );
    }
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${formattedDate}-${file.originalname}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Unsupported file type! Please upload only images or pdfs.",
        400
      ),
      false
    );
  }
};

exports.uploadFileAndImages = multer({
  storage,
  fileFilter: multerFilter
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 3 }
]);

exports.createPost = catchAsync(async (req, res) => {
  const { name, description, author, category } = req.body;

  if (!name || !description || !category) {
    AppError("All required fields must be provided.");
  }

  const coverImage = req.files.coverImage[0].filename;
  const images = req.files.images
    ? req.files.images.map(file => file.filename)
    : [];

  const post = await BlogPost.create({
    name,
    description,
    category,
    author,
    coverImage,
    images
  });

  res.status(201).json({
    status: "success",
    data: {
      post
    }
  });
});

exports.updateImages = catchAsync(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Product not found" });
  }

  const coverImage = req.files.coverImage[0].filename;
  const images = req.files.images
    ? req.files.images.map(file => file.filename)
    : [];

  await BlogPost.findByIdAndUpdate(req.params.id, {
    images: images,
    coverImage: coverImage
  });

  next();
});

const deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      return console.error("Error deleting images:", err);
    }
  });
};

exports.deletePostImages = catchAsync(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { images } = post;
  const { coverImage } = post;

  // Delete images
  if (images && images.length > 0) {
    images.forEach(image => {
      const imagePath = path.join("./../frontend/public/imgs/blogs/", image);
      fs.unlink(imagePath, err => {
        if (err) {
          console.error(`Error deleting file ${imagePath}:`, err);
        }
      });
    });
  }

  // Delete cover image
  if (coverImage) {
    deleteFile(`./../frontend/public/imgs/blogs/${coverImage}`);
  }

  // Send response
  next();
});

exports.getAllPosts = factory.getAll(BlogPost);
exports.getOnePost = factory.getOne(BlogPost);
exports.updatePost = factory.updateOne(BlogPost);
exports.deletePost = factory.deleteOne(BlogPost);

exports.postCategory = catchAsync(async (req, res) => {
  const posts = await BlogPost.find({ category: req.params.category });
  if (!posts) {
    res.status(404).json("no products found in this category");
  }
  res.status(200).json({
    status: "success",
    results: posts.length,
    posts
  });
});
