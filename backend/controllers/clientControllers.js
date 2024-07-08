const Client = require("./../models/clientModel");
const factory = require("./FactoryHandlers");

exports.getAllClients = factory.getAll(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);
exports.getOneClient = factory.getOne(Client);
exports.createClient = factory.createOne(Client);
