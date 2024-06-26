const multer = require("multer");
const fs = require("fs");
const path = require("path");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Service = require("../models/serviceModel");
const factory = require("./FactoryHandlers");

// time format
const now = new Date();
const formattedDate = `${now.getDate()}-${now.getMonth() +
  1}-${now.getFullYear()}`;

// multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, "./../frontend/public/imgs/services");
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
  if (file.mimetype.startsWith("image")) {
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

// uploading files
exports.uploadFileAndImages = multer({
  storage,
  fileFilter: multerFilter
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 3 }
]);

exports.createService = catchAsync(async (req, res) => {
  const { title, body, category } = req.body;
  if (!title || !body || !category) {
    AppError("All required fields must be provided.");
  }

  const coverImage = req.files.coverImage[0].filename;
  const images = req.files.images
    ? req.files.images.map(file => file.filename)
    : [];

  const service = await Service.create({
    title,
    body,
    category,
    coverImage,
    images
  });

  res.status(201).json({
    status: "success",
    data: {
      service
    }
  });
});

exports.updateImages = catchAsync(async (req, res, next) => {
  const services = await Service.findById(req.params.id);
  if (!services) {
    return res.status(404).json({ message: "Service not found" });
  }

  const coverImage = req.files.coverImage[0].filename;
  const images = req.files.images
    ? req.files.images.map(file => file.filename)
    : [];

  await Service.findByIdAndUpdate(req.params.id, {
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

exports.deleteServiceImages = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  const { images } = service;
  const { coverImage } = service;

  // Delete images
  if (images && images.length > 0) {
    images.forEach(image => {
      const imagePath = path.join("./../frontend/public/imgs/services/", image);
      fs.unlink(imagePath, err => {
        if (err) {
          console.error(`Error deleting file ${imagePath}:`, err);
        }
      });
    });
  }

  // Delete cover image
  if (coverImage) {
    deleteFile(`./../frontend/public/imgs/services/${coverImage}`);
  }

  // Send response
  next();
});

exports.getAllServices = factory.getAll(Service);
exports.getOneService = factory.getOne(Service);
exports.updateService = factory.updateOne(Service);
exports.deleteService = factory.deleteOne(Service);

exports.serviceCategory = catchAsync(async (req, res) => {
  const services = await Service.find({ category: req.params.category });
  if (!services) {
    res.status(404).json("no products found in this category");
  }
  res.status(200).json({
    status: "success",
    results: services.length,
    services
  });
});
