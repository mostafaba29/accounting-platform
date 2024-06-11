const path = require("path");
const fs = require("fs");
const multer = require("multer");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Product = require("./../models/productModel");
const factory = require("./FactoryHandlers");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, "./../frontend/public/imgs/products");
    } else if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/msword"
    ) {
      cb(null, "./../frontend/public/files/products");
    } else {
      cb(
        new AppError(
          "Unsupported file type! Please upload only images or excel and word files.",
          400
        ),
        false
      );
    }
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Unsupported file type! Please upload only images or excel and word files.",
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
  { name: "images", maxCount: 3 },
  { name: "document", maxCount: 1 }
]);

exports.createProduct = catchAsync(async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    AppError("All required fields must be provided.");
  }

  const coverImage = req.files.coverImage[0].filename;
  const document = req.files.document[0].filename;
  const images = req.files.images.map(file => file.filename);

  const product = await Product.create({
    name,
    description,
    document,
    price,
    coverImage,
    images
  });

  res.status(201).json({
    status: "success",
    data: {
      product
    }
  });
});

exports.getAllProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);

exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.downloadFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(
    __dirname,
    "./../frontend/public/files/products/",
    filename
  );
  res.download(filePath, err => {
    if (err) {
      return res.status(500).send("Error occurred while downloading the file");
    }
    res.status(200).json("file downloaded");
  });
});

const deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      return console.error("Error deleting file:", err);
    }
  });
};

exports.deleteProductFile = catchAsync(async (req, res) => {
  // Find the product by ID
  const productFile = await Product.findById(req.params.id);
  if (!productFile) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Get the file paths
  const filePath = productFile.document;
  const imagesPaths = productFile.images;
  const coverImagePath = productFile.coverImage;

  // Delete document
  if (filePath) {
    deleteFile(filePath);
  }

  // Delete images
  if (imagesPaths && imagesPaths.length > 0) {
    imagesPaths.forEach(image => {
      deleteFile(image);
    });
  }

  // Delete cover image
  if (coverImagePath) {
    deleteFile(coverImagePath);
  }

  // Send response
  res.status(200).json({ message: "Files deleted successfully" });
});
