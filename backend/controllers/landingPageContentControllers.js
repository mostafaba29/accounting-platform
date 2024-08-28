const LandingPage = require("./../models/landingPageContent");
const factory = require("./FactoryHandlers");

exports.getLandingPage = factory.getAll(LandingPage);
exports.updateLandingPage = factory.updateOne(LandingPage);
exports.deleteLandingPage = factory.deleteOne(LandingPage);
exports.createLandingPage = factory.createOne(LandingPage);
