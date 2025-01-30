const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");
const APIFeaturesClass = require('../utils/apiFeatures'); 
const imageUtils = require('../utils/imageUtils');

// Get All Products
// exports.getProducts = async (query) => {
//   const resPerPage = 4;
//   const productsCount = await Product.countDocuments();

//   // Query se store ka filter remove karne ka check
//   const apiFeatures = new APIFeaturesClass(Product.find(), query)
//     .search()
//     .filter()  // Yahan ensure karo koi store-specific filter nahi laga
//     .pagination(resPerPage);

//   // Ensure filtered count ko direct query se check karo
//   const filteredProductsCount = await Product.find(query).countDocuments();
// console.log(filteredProductsCount)
//   const products = await apiFeatures.query.clone(); // Clone kar ke correct query chalana

//   return { productsCount, resPerPage, filteredProductsCount, products };
// };

exports.getProducts = async (query) => {
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeaturesClass(Product.find(), query)
    .search()
    .filter(); 

  const filteredProductsCount = await apiFeatures.query.clone().countDocuments();
  const products = await apiFeatures.query;

  return { productsCount, filteredProductsCount, products };
};


exports.getProductsByCategory = async (categoryName) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return { message: 'No categories found' };
    }
    const matchingCategories = categories.filter(category =>
      category.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (matchingCategories.length === 0) {
      return { message: 'No categories found matching the provided category name' };
    }
    const categoryIds = matchingCategories.map(category => category._id);
    const products = await Product.find({ category: { $in: categoryIds } });
    if (!products || products.length === 0) {
      return { message: 'No products found for this category' };
    }
    return { products };
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching products by category' };
  }
};





// get products with Store
exports.getProductsWithStore = async (query) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  // Check for ID filtering
  if (query.filter && query.filter._id && query.filter._id.$in) {
    const productIds = query.filter._id.$in;
    // Execute the query with product IDs
    const products = await Product.find({ _id: { $in: productIds } });
    const filteredProductsCount = products.length;

    return {
      productsCount,
      resPerPage,
      filteredProductsCount,
      products
    };
  }

  // Fallback in case no IDs are provided, apply other filters, etc.
  const apiFeatures = new APIFeaturesClass(Product.find(), query)
    .search()
    .filter()
    .pagination(resPerPage);

  const filteredProductsCount = await apiFeatures.query.clone().countDocuments();
  const products = await apiFeatures.query;

  return {
    productsCount,
    resPerPage,
    filteredProductsCount,
    products
  };
};

// Fetch products by store
exports.getProductsByStore = async (storeId, query) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments({ seller: storeId });

  const apiFeatures = new APIFeaturesClass(Product.find({ seller: storeId }), query)
    .search()
    .filter()
    .pagination(resPerPage);

  const filteredProductsCount = await apiFeatures.query.clone().countDocuments();
  const products = await apiFeatures.query;

  return { productsCount, resPerPage, filteredProductsCount, products };
};


exports.getProductsByStore = async (storeId) => {
  const resPerPage = 4; 
  const productsCount = await Product.countDocuments({ seller: storeId });
  const products = await Product.find({ seller: storeId });
  const totalPages = Math.ceil(productsCount / resPerPage);
  return {
    productsCount,
    totalPages,
    products
  };
};


// Get Single Product
exports.getSingleProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }
  return product;
};

// Create Product
exports.createProduct = async (productData, store, images) => {
  const categoryExists = await Category.findById(productData.category);
  if (!categoryExists) {
    throw new ApiError("Category does not exist", 400);
  }

  const subcategoryExists = categoryExists.subcategories.some(
    (subcat) => subcat._id.toString() === productData.subcategory
  );
  if (!subcategoryExists) {
    throw new ApiError("Subcategory does not exist under this category", 400);
  }

  const product = new Product({
    ...productData,
    images,
    seller: store._id,
  });

  store.products.push(product._id);
  await store.save();

  await product.save();
  return product;
};

// Update Product
exports.updateProduct = async (id, updateData, images = null) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }
  if (images) {
    if (product.images && product.images.length > 0) {
      product.images.forEach(async (image) => {  
        await imageUtils.deleteImage(image.url, 'local');
      });
    }
    updateData.images = images;
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new ApiError("Error updating product", 500);
  }

  return updatedProduct;
};

// Delete Product
exports.deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  await product.deleteOne();
  return true;
};



exports.bulkUploadProducts = async (productDataArray) => {
    const products = await Product.insertMany(productDataArray, { ordered: false });
    return products;
  };
  