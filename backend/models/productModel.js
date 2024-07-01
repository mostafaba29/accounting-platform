const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title_AR: {
      type: String,
      required: [true, "a product must have a title"],
      trim: true
    },
    title_EN: {
      type: String,
      required: [true, "a product must have a title"],
      trim: true
    },
    description_AR: {
      type: String,
      trim: true,
      required: [true, "a product must have a description"]
    },
    description_EN: {
      type: String,
      trim: true,
      required: [true, "a product must have a description"]
    },
    body_AR: {
      type: String,
      required: [true, "an product must have an arabic body"]
    },
    body_EN: {
      type: String,
      required: [true, "an product must have an english body"]
    },
    basic_version: {
      document: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return value > 0;
          },
          message: "Price must be greater than zero"
        }
      }
    },
    open_version: {
      document: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return value > 0;
          },
          message: "Price must be greater than zero"
        }
      }
    },
    editable_version: {
      document: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return value > 0;
          },
          message: "Price must be greater than zero"
        }
      }
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    coverImage: {
      type: String,
      required: [true, "a product must have a cover image"]
    },
    images: [String],
    video: String,
    slug: String,
    discount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: "Discount price should be below origianl price"
      }
    },
    Sucessful_Purchases: Number,
    views: { type: Number, default: 0 },
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

productSchema.index({ slug: 1 });

productSchema.pre("save", function(next) {
  this.slug = slugify(this.title_EN, { lower: true });
  next();
});

// Pre-save middleware to apply discount to file prices
productSchema.pre("save", function(next) {
  if (this.isModified("discount")) {
    const discountFactor = (100 - this.discount) / 100;

    if (this.basic_file && this.basic_file.price) {
      this.basic_file.price = Math.round(
        this.basic_file.price * discountFactor
      );
    }
    if (this.open_file && this.open_file.price) {
      this.open_file.price = Math.round(this.open_file.price * discountFactor);
    }
    if (this.editable_file && this.editable_file.price) {
      this.editable_file.price = Math.round(
        this.editable_file.price * discountFactor
      );
    }
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
