const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "an article must have a title"]
    },
    body: {
      type: String,
      required: [true, "an article must have a body"]
    },
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

ArticleSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
