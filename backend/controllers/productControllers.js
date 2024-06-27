const path = require("path");
const fs = require("fs");
const multer = require("multer");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Product = require("./../models/productModel");
const factory = require("./FactoryHandlers");

//date format
const now = new Date();
const formattedDate = `${now.getDate()}-${now.getMonth() +
  1}-${now.getFullYear()}`;

//storage
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
    cb(null, `${file.fieldname}-${formattedDate}-${file.originalname}`);
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

//uploading
const uploadFileAndImages = multer({
  storage,
  fileFilter: multerFilter
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 3 },
  { name: "document", maxCount: 1 }
]);

//deleting files
const deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      return console.error("Error deleting file:", err);
    }
  });
};

//creating products
exports.createProduct = catchAsync(async (req, res) => {
  uploadFileAndImages(req, res, async function(err) {
    if (err) {
      if (req.files.coverImage) {
        await deleteFile(req.files.coverImage);
      }
      if (req.files.document) {
        await deleteFile(req.files.document);
      }
      if (req.files.images) {
        await deleteFile(req.files.images);
      }
      if (err instanceof multer.MulterError) {
        return res.status(400).send({ error: "File upload error" });
      }
      return res.status(400).send({ error: err.message });
    }
    const { name, description, price, category } = req.body;
    const coverImage = req.files.coverImage[0].filename;
    const document = req.files.document[0].filename;
    const images = req.files.images
      ? req.files.images.map(file => file.filename)
      : [];

    const product = await Product.create({
      name,
      description,
      category,
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
});

// routes
exports.getAllProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

//download
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

//updating product
exports.updateProductFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  uploadFileAndImages(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ error: err });
    }
    if (err) {
      return res.status(400).send({ error: err.message });
    }

    // Fetch the current product to access old files
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update document field if a new document is uploaded
    if (req.files.document) {
      req.body.document = req.files.document[0].filename;
      if (product.document) {
        await deleteFile(
          path.join("./../frontend/public/files/products/", product.document)
        );
      }
    }

    // Update coverImage field if a new coverImage is uploaded
    if (req.files.coverImage) {
      req.body.coverImage = req.files.coverImage[0].filename;
      if (product.coverImage) {
        await deleteFile(
          path.join("./../frontend/public/imgs/products/", product.coverImage)
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

      req.body.images = [...product.images]; // Copy existing images array
      const newImageFilename = req.files.images.filename;
      req.body.images[indexToUpdate] = newImageFilename;
      await deleteFile(
        `./../frontend/public/imgs/products/
          ${product.images}`
      );
    }
    next();
  });
});

//route for deleting
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

//category
exports.productCategory = catchAsync(async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  if (products.length === 0) {
    res.status(404).json("no products found in this category");
  }
  res.status(200).json({
    status: "success",
    results: products.length,
    products
  });
});
