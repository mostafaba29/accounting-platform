const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Product = require("./../models/productModel");
const factory = require("./FactoryHandlers");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 }
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  req.body.imageCover = `product-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`./../../frontend/public/img/products/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`./../../frontend/public/img/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./../../frontend/public/files/products/");
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

exports.downloadFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(
    __dirname,
    "./../../frontend/public/files/products/",
    filename
  );
  res.download(filePath, err => {
    if (err) {
      return res.status(500).send("Error occurred while downloading the file");
    }
    res.status(200).json("file downloaded");
  });
});

exports.fileUpload = multer({ storage: storage });

exports.getAllProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);

exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
