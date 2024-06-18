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
    views: { type: Number, default: 0 },
    author: String,
    slug: String,
    reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
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

BlogPostSchema.pre(/^find/, async function(next) {
  await this.model.updateOne(this.getQuery(), { $inc: { views: 1 } });
  next();
});

const BlogPost = mongoose.model("Blog_Post", BlogPostSchema);

module.exports = BlogPost;
