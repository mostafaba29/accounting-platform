const PrivacyPolicyPage = require("./../models/productModel");
const factory = require("./FactoryHandlers");

exports.getPrivacyPolicyPage = factory.getAll(PrivacyPolicyPage);
exports.updatePrivacyPolicyPage = factory.updateOne(PrivacyPolicyPage);
exports.deletePrivacyPolicyPage = factory.deleteOne(PrivacyPolicyPage);
exports.createPrivacyPolicyPage = factory.createOne(PrivacyPolicyPage);
