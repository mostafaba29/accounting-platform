const mongoose = require("mongoose");
const slugify = require("slugify");

const blogPostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "a post must have a name"]
    },
    description: {
      type: String,
      required: [true, "a post must have a description"]
    },
    author: String,
    slug: String,
    imageCover: {
      type: String,
      required: [true, "a post must have an image"]
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogPostSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const blogPost = mongoose.model("Post", blogPostSchema);

module.exports = blogPost;
