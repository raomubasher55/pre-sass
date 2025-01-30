const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    trim: true,
    maxLength: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  }, 
  discountedPrice: {
    type: Number,
    default: 0.0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 100; // Discount percentage must be between 0 and 100
      },
      message: 'Discount percentage must be between 0 and 100',
    },
  },
  discountStartDate: {
    type: Date,
    // required: true,
  },
  discountEndDate: {
    type: Date,
    // required: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      fileType: {  // Add the fileType field here
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subcategory', // Reference to the Subcategory model
    required: true,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "Store",
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: String,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User", // Reference to User model
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review", // Reference to the Review model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to calculate discounted price before saving the product
productSchema.pre('save', function (next) {

  if (this.discountPercentage > 0 && this.discountStartDate && this.discountEndDate) {
    const currentDate = new Date();
    if (currentDate >= this.discountStartDate && currentDate <= this.discountEndDate) {
      this.discountedPrice = this.price - (this.price * (this.discountPercentage / 100));
    } else {
      this.discountedPrice = this.price;
    }
  } else {
    this.discountedPrice = this.price;
  }
  next();
});


// Helper method to check if the discount is active
productSchema.methods.isDiscountActive = function () {
  const currentDate = new Date();
  return currentDate >= this.discountStartDate && currentDate <= this.discountEndDate;
};

module.exports = mongoose.model("Product", productSchema);
