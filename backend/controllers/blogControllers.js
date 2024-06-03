const BlogPost = require("../models/blogPostModel");
const factory = require("./FactoryHandlers");

exports.getAllPosts = factory.getAll(BlogPost);
exports.createPost = factory.createOne(BlogPost);

exports.getOnePost = factory.getOne(BlogPost);
exports.updatePost = factory.updateOne(BlogPost);
exports.deletePost = factory.deleteOne(BlogPost);
