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

const uploadImages = multer({
  storage,
  fileFilter: multerFilter
}).fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 }
]);

//deleting files
const deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      return console.error("Error deleting file:", err);
    }
  });
};

exports.createBlog = catchAsync(async (req, res) => {
  uploadImages(req, res, async function(err) {
    if (err) {
      if (req.files.coverImage) {
        await deleteFile(req.files.coverImage);
      }
      if (req.files.images) {
        await deleteFile(req.files.images);
      }
      if (err instanceof multer.MulterError) {
        return res.status(400).send({ error: "File upload error" });
      }
      return res.status(400).send({ error: err.message });
    }
    const { name, description, author, category } = req.body;

    if (!name || !description || !category) {
      AppError("All required fields must be provided.");
    }

    const imageCover = req.files.imageCover[0].filename;
    const images = req.files.images
      ? req.files.images.map(file => file.filename)
      : [];

    const post = await BlogPost.create({
      name,
      description,
      category,
      author,
      imageCover,
      images
    });

    res.status(201).json({
      status: "success",
      data: {
        post
      }
    });
  });
});

exports.updateBlogImages = catchAsync(async (req, res, next) => {
  const blog = await BlogPost.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  uploadImages(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ error: err });
    }
    if (err) {
      return res.status(400).send({ error: err.message });
    }

    // Update coverImage field if a new coverImage is uploaded
    if (req.files.coverImage) {
      req.body.coverImage = req.files.coverImage[0].filename;
      if (blog.coverImage) {
        await deleteFile(
          path.join("./../frontend/public/imgs/blogs/", blog.coverImage)
        );
      }
    }

    // Update a specific image in the images array
    if (req.files.images) {
      const indexToUpdate = parseInt(req.body.imageIndex, 10);
      //    if (
      //      // eslint-disable-next-line no-restricted-globals
      //      isNaN(indexToUpdate) ||
      //      indexToUpdate < 0 ||
      //      indexToUpdate >= product.images.length
      //    ) {
      //      return res.status(400).send({ error: "Invalid image index" });
      //    }

      req.body.images = [...blog.images]; // Copy existing images array
      const newImageFilename = req.files.images.filename;
      req.body.images[indexToUpdate] = newImageFilename;
      await deleteFile(
        `./../frontend/public/imgs/blogs/
          ${blog.images}`
      );
    }

    next();
  });
});

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
  if (posts.length === 0) {
    res.status(404).json("no blogs found in this category");
  }
  res.status(200).json({
    status: "success",
    results: posts.length,
    posts
  });
});
