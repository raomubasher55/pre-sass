const Review = require("../models/review.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");


// Add or Update Review
exports.addOrUpdateReview = async (productId, reviewData, user) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  // Check if the review already exists
  let review = await Review.findOne({ product: productId, user: user._id });

  if (review) {
    review.rating = reviewData.rating;
    review.comment = reviewData.comment;
  } else {
    review = new Review({
      product: productId,
      user: user._id,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });
  }

  await review.save();

  const reviews = await Review.find({ product: productId });

  if (!product.reviews.includes(review._id)) {
    product.reviews.push(review._id);
  }

  product.ratings =
    reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  if (!user.reviews.includes(review._id)) {
    user.reviews.push(review._id);
  }

  await user.save();
  await product.save();

  return product;
};


// Get Reviews for a Product
exports.getProductReviews = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  const reviews = await Review.find({ product: productId })
    .populate({
      path: "user",
      select: "avatar name",
    })
    .exec();

  return reviews;
};

// Delete Review
exports.deleteReview = async (productId, reviewId, user) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    product: productId,
    user: user._id,
  });

  if (!review) {
    throw new ApiError("Review not found", 404);
  }
  user.reviews.pull(reviewId);
  product.reviews.pull(reviewId);
  const reviews = await Review.find({ product: productId });
  product.ratings =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
  await user.save();
  await product.save();

  return reviews;
};

