const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogPostSchema = new mongoose.Schema(
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
    views: Number,
    author: String,
    slug: String,
    imageCover: {
      type: String
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

BlogPostSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const BlogPost = mongoose.model("Blog_Post", BlogPostSchema);

module.exports = BlogPost;
