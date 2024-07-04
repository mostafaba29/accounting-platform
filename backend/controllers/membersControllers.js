const factory = require("./FactoryHandlers");
const About = require("../models/membersModel");

exports.createMember = factory.createOne(About);
exports.getAllMembers = factory.getAll(About);
exports.getMember = factory.getOne(About);
exports.updateMember = factory.updateOne(About);
exports.deleteMember = factory.deleteOne(About);
