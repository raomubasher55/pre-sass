const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const Category = require("../models/category.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const APIFeatures = require("../utils/apiFeatures");
const { query } = require("express");
const fs = require("fs");
const csv = require("csv-parser");

// const validateCategoryAndSubcategory = async (category, subcategory) => {
//   if (category) {
//     const categoryExists = await Category.findById(category);
//     if (!categoryExists) {
//       throw new ApiError("Category does not exist", 400);
//     }

//     if (subcategory) {
//       const subcategoryExists = categoryExists.subcategories.some(
//         (subcat) => subcat._id.toString() === subcategory
//       );
//       if (!subcategoryExists) {
//         throw new ApiError(
//           "Subcategory does not exist under this category",
//           400
//         );
//       }
//     }
//   }
// };

// exports.getProducts = catchAsyncErrors(async (req, res, next) => {
//   const resPerPage = 4;
//   const productsCount = await Product.countDocuments();

//   // Initialize APIFeatures with the query
//   const apiFeatures = new APIFeatures(Product.find(), req.query)
//     .search()
//     .filter()
//     .pagination(resPerPage);

//   // Count filtered products without pagination
//   const filteredProductsCount = await apiFeatures.query
//     .clone()
//     .countDocuments();

//   // Apply pagination to the query
//   apiFeatures.pagination(resPerPage);

//   // Fetch paginated products
//   const products = await apiFeatures.query;

//   res.status(200).json({
//     success: true,
//     productsCount,
//     resPerPage,
//     filteredProductsCount,
//     products,
//   });
// });

// exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return next(new ApiError("Product not found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });

// exports.newProduct = async (req, res, next) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       stock,
//       discountPercentage,
//       discountStartDate,
//       discountEndDate,
//     } = req.body;

//     // Validate if category exists
//     const categoryExists = await Category.findById(category);
//     if (!categoryExists) {
//       return next(new ApiError("Category does not exist", 400));
//     }

//     // Validate if subcategory exists within the selected category
//     const subcategoryExists = categoryExists.subcategories.some(
//       (subcat) => subcat._id.toString() === subcategory
//     );
//     if (!subcategoryExists) {
//       return next(
//         new ApiError("Subcategory does not exist under this category", 400)
//       );
//     }

//     // Process uploaded images
//     const images = req.files.map((file) => ({
//       url: file.path,
//       filename: file.filename,
//     }));

//     // Create a new product instance with provided details
//     const product = new Product({
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       stock,
//       images, // Add images to the product
//       seller: req.user._id,
//       discountPercentage,
//       discountStartDate,
//       discountEndDate,
//     });

//     // Save the product to the database
//     await product.save();

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product, // Product will already have discountedPrice calculated
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Bulk product
// exports.bulkUpload = catchAsyncErrors(async (req, res, next) => {
//   const results = [];

//   // Parse the CSV file
//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', async () => {
//       try {
//         const products = [];

//         for (const item of results) {
//           // Process images
//           let images = [];
//           if (item.images) {
//             try {
//               images = JSON.parse(item.images); // Parse the images JSON string
//             } catch (error) {
//               console.error('Error parsing images JSON:', error);
//               return res.status(400).json({ success: false, message: 'Invalid images format in CSV.' });
//             }
//           }

//           // Create a new product instance
//           const product = new Product({
//             name: item.name,
//             description: item.description,
//             price: parseFloat(item.price),
//             images: images, // Add images to the product
//           });

//           products.push(product);
//         }

//         // Save products in bulk
//         await Product.insertMany(products);

//         res.status(201).json({
//           success: true,
//           message: 'Products created successfully',
//           count: products.length,
//         });
//       } catch (error) {
//         console.error('Error inserting products:', error);
//         return res.status(500).json({ success: false, message: 'Failed to insert products.' });
//       } finally {
//         // Clean up the uploaded file
//         fs.unlink(req.file.path, (err) => {
//           if (err) {
//             console.error('Error deleting file:', err);
//           }
//         });
//       }
//     })
//     .on('error', (error) => {
//       console.error('Error reading CSV file:', error);
//       return res.status(500).json({ success: false, message: 'Failed to read the CSV file.' });
//     });
// });

// exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
//   const { category, subcategory } = req.body;

//   try {
//     if (category || subcategory) {
//       // Validate category and subcategory if provided
//       await validateCategoryAndSubcategory(category, subcategory);
//     }

//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return next(new ApiError("Product not found", 404));
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       product: updatedProduct,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
//   let product = await Product.findById(req.params.id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "product not found ",
//     });
//   }

//   await product.deleteOne();

//   res.status(200).json({
//     success: true,
//     message: "product is deleted",
//   });
// });

// // Discount
// exports.updateProductDiscount = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const { discountPercentage, discountStartDate, discountEndDate } = req.body;

//     // Validate if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return next(new ApiError("Product not found", 404));
//     }

//     // Update discount information
//     product.discountPercentage = discountPercentage;
//     product.discountStartDate = discountStartDate;
//     product.discountEndDate = discountEndDate;

//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: "Product discount updated successfully",
//       product,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

  // // Remove discount from product
  // exports.removeProductDiscount = async (req, res, next) => {
  //   try {
  //     const { productId } = req.params;

  //     // Validate if the product exists
  //     const product = await Product.findById(productId);
  //     if (!product) {
  //       return next(new ApiError("Product not found", 404));
  //     }

  //     // Remove the discount by setting discount percentage to 0
  //     product.discountPercentage = 0;
  //     product.discountedPrice = product.price; // Revert back to the original price

  //     await product.save();

  //     res.status(200).json({
  //       success: true,
  //       message: "Product discount removed successfully",
  //       product,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

// // Reviews

// exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, productId } = req.body;

//   // Ensure the required fields are present
//   if (!rating || !comment || !productId) {
//     return next(
//       new ApiError("Please provide rating, comment, and productId", 400)
//     );
//   }

//   // Find the product by productId
//   const product = await Product.findById(productId);

//   // If product is not found
//   if (!product) {
//     return next(new ApiError("Product not found", 404));
//   }

//   // Check if the user has already reviewed the product
//   const existingReview = product.reviews.find(
//     (r) => r.user.toString() === req.user._id.toString()
//   );

//   // If review exists, update it
//   if (existingReview) {
//     existingReview.comment = comment;
//     existingReview.rating = rating;
//     existingReview.date = Date.now(); // Update the review date
//   } else {
//     // If no review exists, push a new review
//     const newReview = {
//       user: req.user._id, // Storing the user reference
//       name: req.user.name, // Assuming the user has a `name` field
//       rating: Number(rating),
//       comment,
//     };

//     product.reviews.push(newReview);
//     product.numOfReviews = product.reviews.length; // Update the number of reviews
//   }

//   // Recalculate the product's average rating
//   product.ratings =
//     product.reviews.reduce((acc, review) => review.rating + acc, 0) /
//     product.reviews.length;

//   // Save the updated product
//   await product.save({ validateBeforeSave: false });

//   // Add the product review reference to the user's reviews array (optional)
//   const user = await User.findById(req.user._id);
//   if (user) {
//     const existingProductReview = user.reviews.find(
//       (r) => r.toString() === productId.toString()
//     );
//     if (!existingProductReview) {
//       user.reviews.push(productId);
//       await user.save({ validateBeforeSave: false });
//     }
//   }

//   res.status(200).json({
//     success: true,
//     message: existingReview
//       ? "Review updated successfully"
//       : "Review added successfully",
//   });
// });

// // Get Product Reviews => /api/v1/reviews
// exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
//   const { id } = req.query;

//   // Validate if ID is provided
//   if (!id) {
//     return next(new ApiError("Product ID is required", 400));
//   }

//   // Check if the ID is valid (MongoDB ObjectId format)
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return next(new ApiError("Invalid Product ID", 400));
//   }

//   // Fetch the product by ID
//   const product = await Product.findById(id);

//   // Check if the product exists
//   if (!product) {
//     return next(new ApiError("Product not found", 404));
//   }

//   // Send response with product reviews
//   res.status(200).json({
//     success: true,
//     reviews: product.reviews, // Include reviews in the response
//   });
// });

// // Delete Product Review => /api/v1/reviews
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const { productId, reviewId } = req.query;

//   if (!productId || !reviewId) {
//     return next(new ApiError("Product ID and Review ID are required", 400));
//   }

//   // Fetch the product by productId
//   const product = await Product.findById(productId);

//   if (!product) {
//     return next(new ApiError("Product not found", 404));
//   }

//   // Find the review to delete
//   const reviewIndex = product.reviews.findIndex(
//     (review) => review._id.toString() === reviewId.toString()
//   );

//   if (reviewIndex === -1) {
//     return next(new ApiError("Review not found", 404));
//   }

//   // Ensure that the user deleting the review is the one who created it
//   const review = product.reviews[reviewIndex];
//   if (review.user.toString() !== req.user._id.toString()) {
//     return next(
//       new ApiError("You are not authorized to delete this review", 403)
//     );
//   }

//   // Remove the review from the product
//   product.reviews.splice(reviewIndex, 1);

//   // Recalculate the number of reviews and ratings
//   const numOfReviews = product.reviews.length;
//   const ratings =
//     numOfReviews > 0
//       ? product.reviews.reduce((acc, review) => review.rating + acc, 0) /
//         numOfReviews
//       : 0;

//   // Update product fields
//   product.numOfReviews = numOfReviews;
//   product.ratings = ratings;

//   // Save the updated product
//   await product.save({ validateBeforeSave: false });

//   // Remove the product reference from the user's reviews array
//   const user = await User.findById(req.user._id);

//   // Check if the user exists
//   if (!user) {
//     return next(new ApiError("User not found", 404));
//   }

//   // Find and remove the productId from the user's reviews array
//   const reviewIndexUser = user.reviews.findIndex(
//     (userReview) => userReview.toString() === productId.toString()
//   );

//   if (reviewIndexUser !== -1) {
//     user.reviews.splice(reviewIndexUser, 1);
//     await user.save({ validateBeforeSave: false }); // Avoid validation error on save
//   }

//   // Return success response
//   res.status(200).json({
//     success: true,
//     message: "Review deleted successfully",
//   });
// });















const productService = require("../services/product.service");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");

// Get All Products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body)
  const result = await productService.getProducts(req.query);
  res.status(200).json({ success: true, ...result });
});


// getAll by category 
exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
  const { categoryName } = req.params;
  const products = await productService.getProductsByCategory(categoryName);
  res.status(200).json({
    success: true,
    products, 
  });
});


exports.ProductsByStore = catchAsyncErrors(async (req, res, next) => {
  const { ids, ...otherQueryParams } = req.query;

  let queryOptions = { ...otherQueryParams };

  if (ids) {
    const productIds = ids.split(',').map(id => id.trim());
    queryOptions.filter = { _id: { $in: productIds } };
  }

  const result = await productService.getProductsWithStore(queryOptions);

  res.status(200).json({
    success: true,
    ...result
  });
});



exports.fetchStoreProducts = catchAsyncErrors(async (req, res, next) => {
  const storeId = req.store._id;
  
  const result = await productService.getProductsByStore(storeId, req.query);
  
  res.status(200).json({ success: true, products: result });
});


// Fetch all products by storeId
exports.fetchStoreProductsById = catchAsyncErrors(async (req, res, next) => {
  const storeId = req.params.storeId;
  
  if (!storeId) {
    return res.status(400).json({ success: false, message: 'Store ID is required' });
  }
  const result = await productService.getProductsByStore(storeId);
  res.status(200).json({ success: true, products: result });
});


// Get Single Product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productService.getSingleProduct(req.params.id);
  res.status(200).json({ success: true, product });
});

// Create New Product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    throw new ApiError("Please upload images for the product", 400);
  }

  const images = req.files.map((file) => ({
    url: file?.path || "",  
    filename: file?.filename || "",
    fileType: file?.mimetype || "unknown", 
  }));
  images.forEach((img) => {
    console.log(`Image URL: ${img.url}, File Type: ${img.fileType}`);
  });

  const product = await productService.createProduct(req.body, req.store, images);
  
  res.status(201).json({ success: true, message: "Product created successfully", product });
});


// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let images = [];

    // Handle existing images safely
    if (req.body.existingImages) {
      if (Array.isArray(req.body.existingImages)) {
        images = req.body.existingImages.map((img) => JSON.parse(img));
      } else {
        images = [JSON.parse(req.body.existingImages)];
      }
    }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));

      images = [...images, ...newImages];
    }

    console.log('Final images array:', images);
    console.log('Product data:', req.body);

    const updatedProduct = await productService.updateProduct(req.params.id, req.body, images);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({ success: true, message: "Product deleted successfully" });
});



// Bulk Upload Products
exports.bulkUploadProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productService.bulkUploadProducts(req.body.products);
  res.status(201).json({ success: true, products });
});
