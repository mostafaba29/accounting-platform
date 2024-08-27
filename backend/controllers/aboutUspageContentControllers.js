const AboutUsPage = require("./../models/productModel");
const factory = require("./FactoryHandlers");

exports.getAboutUsPage = factory.getAll(AboutUsPage);
exports.updateAboutUsPage = factory.updateOne(AboutUsPage);
exports.deleteAboutUsPage = factory.deleteOne(AboutUsPage);
exports.createAboutUsPage = factory.createOne(AboutUsPage);
