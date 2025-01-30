const Store = require("../models/store.model");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto");
const { sendVerificationEmail, sendPasswordResetEmail } = require("./email.service");

/**
 * Create a new store
 * @param {Object} storeData - Store data
 * @returns {Promise<Store>}
 */
// const createStore = async (storeData) => {
//   if (await Store.isEmailTaken(storeData.email)) {
//     throw new ApiError("Email already taken", 401);
//   }

//   const store = await Store.create(storeData);

//   // Generate email verification token
//   const verificationToken = crypto.randomBytes(20).toString("hex");
//   store.verificationToken = verificationToken;
//   await store.save();

//   // Send verification email
//   await sendVerificationEmail(store.email, verificationToken);

//   return store;
// };

const createStore = async (storeData) => {
  if (await Store.isEmailTaken(storeData.email)) {
    throw new ApiError("Email already taken", 401);
  }
  
  const store = await Store.create(storeData);

  // Generate email verification token
  const verificationToken = crypto.randomBytes(20).toString("hex");
  store.verificationToken = verificationToken;
  await store.save();

  // Send verification email
  await sendVerificationEmail(store.email, verificationToken);

  return store;
};

/**
 * Get store by email and password
 * @param {string} email - Store email
 * @param {string} password - Store password
 * @returns {Promise<Store>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const store = await Store.findOne({ email }).select("+password");
  if (!store || !(await store.comparePassword(password))) {
    throw new ApiError("Incorrect email or password", 401);
  }
  return store;
};

/**
 * Get store by ID
 * @param {string} storeId - Store ID
 * @returns {Promise<Store>}
 */
const getStoreById = async (storeId) => {
  const store = await Store.findById(storeId);
  if (!store) {
    throw new ApiError("Store not found", 404);
  }
  return store;
};

/**
 * Get all stores with pagination
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getAllStores = async (filter, options) => {
  const stores = await Store.paginate(filter, options);
  return stores;
};

/**
 * Update a store by ID
 * @param {string} storeId - Store ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Store>}
 */
const updateStoreById = async (storeId, updateData) => {
  const store = await Store.findByIdAndUpdate(storeId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!store) {
    throw new ApiError("Store not found", 404);
  }
  return store;
};

/**
 * Delete a store by ID
 * @param {string} storeId - Store ID
 * @returns {Promise<void>}
 */
const deleteStoreById = async (storeId) => {
  const store = await Store.findByIdAndDelete(storeId);
  if (!store) {
    throw new ApiError("Store not found", 404);
  }
  return;
};

/**
 * Forgot password
 * @param {string} email
 * @param {string} protocol
 * @param {string} host
 * @returns {Promise<void>}
 */
const forgetPasswordService = async (email, protocol, host) => {
  const store = await Store.findOne({ email });

  if (!store) {
    throw new ApiError("Store not found", 404);
  }

  const resetToken = store.getResetPasswordToken();
  await store.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail(store.email, resetToken, host, protocol);
  } catch (error) {
    Store.resetPasswordToken = undefined;
    store.resetPasswordExpires = undefined;
    await store.save({ validateBeforeSave: false });
    throw new ApiError("Email could not be sent", 500);
  }
};


/**
 * Reset password 
 * @param {string} token 
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {Promise<void>}
 */
const resetPasswordService = async (token, password, confirmPassword) => {
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  const store = await Store.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!store) {
    throw new ApiError('Invalid token or token is expired', 400);
  }

  if (password !== confirmPassword) {
    throw new ApiError('Passwords do not match', 400);
  }

  store.password = password;
  store.resetPasswordToken = undefined;
  store.resetPasswordExpires = undefined;
  await store.save({ validateBeforeSave: false });
};

module.exports = {
  createStore,
  getStoreById,
  getAllStores,
  updateStoreById,
  deleteStoreById,
  loginWithEmailAndPassword,
  forgetPasswordService,
  resetPasswordService,
};
