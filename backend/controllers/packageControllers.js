const Package = require("./../models/productModel");
const factory = require("./FactoryHandlers");
const Product = require("../models/productModel");

const catchAsync = require("../utils/catchAsync");

exports.getAllPackages = factory.getAll(Package);
exports.getOnePackage = factory.getOne(Package);
exports.updatePackage = factory.updateOne(Package);
exports.deletePackage = factory.deleteOne(Package);
//exports.createPackage = factory.createOne(Package);

exports.createPackage = catchAsync(async (req, res, next) => {
  const { name, productIds } = req.body;
  const products = await Product.find({ _id: { $in: productIds } });
  // Create new package
  const newPackage = await Package.create({
    name,
    products: productIds
  });

  res.status(201).json({
    status: "success",
    data: {
      package: newPackage
    }
  });
});
