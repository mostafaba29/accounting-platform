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

exports.updateFilesAndImages = catchAsync(async (req, res, next) => {
  const productFile = await Product.findById(req.params.id);
  if (!productFile) {
    return res.status(404).json({ message: "Product not found" });
  }

  const coverImage = req.files.coverImage[0].filename;
  const document = req.files.document[0].filename;
  const images = req.files.images.map(file => file.filename);

  const updatedFiles = await Product.findByIdAndUpdate(req.params.id, {
    images: images,
    coverImage: coverImage,
    document: document
  });

  next();
});

exports.getAllProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);

exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.downloadFile = catchAsync(async (req, res) => {
  const productFile = await Product.findById(req.params.productId);
  console.log(productFile);
  if (!productFile) {
    return res.status(404).json({ message: "Product not found" });
  }
  const { document } = productFile;
  const filePath = `./../frontend/public/files/products/${document}`;
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

exports.deleteProductFiles = catchAsync(async (req, res, next) => {
  // Find the product by ID
  const productFile = await Product.findById(req.params.id);
  if (!productFile) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Get the file paths
  const { document } = productFile;
  const { images } = productFile;
  const { coverImage } = productFile;

  // Delete document
  if (document) {
    deleteFile(`./../frontend/public/files/products/${document}`);
  }

  // Delete images
  if (images && images.length > 0) {
    images.forEach(image => {
      const imagePath = path.join("./../frontend/public/imgs/products/", image);
      fs.unlink(imagePath, err => {
        if (err) {
          console.error(`Error deleting file ${imagePath}:`, err);
        }
      });
    });
  }

  // Delete cover image
  if (coverImage) {
    deleteFile(`./../frontend/public/imgs/products/${coverImage}`);
  }

  // Send response
  next();
});
