const Article = require("../models/articleModel");
const factory = require("./FactoryHandlers");

exports.getAllArticles = factory.getAll(Article);
exports.createArticle = factory.createOne(Article);

exports.getOneArticle = factory.getOne(Article);
exports.updateArticle = factory.updateOne(Article);
exports.deleteArticle = factory.deleteOne(Article);
