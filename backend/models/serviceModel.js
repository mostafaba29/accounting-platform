const mongoose = require("mongoose");
const slugify = require("slugify");

const ServiceSchema = new mongoose.Schema(
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
    views: Number,
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

ServiceSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
