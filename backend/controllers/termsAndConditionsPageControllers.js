const TermsAndConditionsPage = require("./../models/productModel");
const factory = require("./FactoryHandlers");

exports.getTermsAndConditionsPage = factory.getAll(TermsAndConditionsPage);
exports.updateTermsAndConditionsPage = factory.updateOne(
  TermsAndConditionsPage
);
exports.deleteTermsAndConditionsPage = factory.deleteOne(
  TermsAndConditionsPage
);
exports.createTermsAndConditionsPage = factory.createOne(
  TermsAndConditionsPage
);
