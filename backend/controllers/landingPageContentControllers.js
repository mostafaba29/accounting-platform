const catchAsync = require("../utils/catchAsync");
const LandingPage = require("./../models/landingPageContent");
const factory = require("./FactoryHandlers");
const AppError = require("../utils/appError");

exports.getLandingPage = factory.getAll(LandingPage);
exports.updateLandingPage = catchAsync(async (req, res, next) => {
  const updatedData = { ...req.body };
  if (updatedData.services && !Array.isArray(updatedData.services)) {
    updatedData.services = [updatedData.services];
  }

  // Validate services data
  if (updatedData.services) {
    updatedData.services = updatedData.services.map(service => ({
      title_AR: service.title_AR,
      title_EN: service.title_EN,
      description_AR: service.description_AR,
      description_EN: service.description_EN,
      icon: service.icon
    }));
  }
  const updatedDoc = await LandingPage.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
      runValidators: true
    }
  );

  if (!updatedDoc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedDoc
    }
  });
});
exports.deleteLandingPage = factory.deleteOne(LandingPage);
exports.createLandingPage = factory.createOne(LandingPage);
