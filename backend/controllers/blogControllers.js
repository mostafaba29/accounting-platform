const blogPost = require("./../models/blogModel");
const factory = require("./FactoryHandlers");

exports.getAllPosts = factory.getAll(blogPost);
exports.createPost = factory.createOne(blogPost);

exports.getOnePost = factory.getOne(blogPost);
exports.updatePost = factory.updateOne(blogPost);
exports.deletePost = factory.deleteOne(blogPost);
