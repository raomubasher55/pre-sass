const storeService = require("../services/store.service");
const ApiError = require("../utils/ApiError");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const Store = require('../models/store.model');
const sendToken = require("../utils/jwtToken");

/**
 * Controller to create a store
 */
// exports.createStore = catchAsyncErrors(async (req, res, next) => {
//   const storeData = req.body;
//   const store = await storeService.createStore(storeData);
//   sendToken(store , 201 , res);
// });

exports.createStore = catchAsyncErrors(async (req, res, next) => {
  const storeData = req.body;

  if (req.file) {
    storeData.photo = {
      public_id: req.file.filename,
      url: `/uploads/images/${req.file.filename}`,
    };
  } else {
    return next(new ApiError("Please upload a store image", 400));
  }

  const store = await storeService.createStore(storeData);
  sendToken(store, 201, res);
});


/**
 * Controller to verify email with token
 */
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.query;

  // Find store with the provided verification token
  const store = await Store.findOne({ verificationToken: token });
  if (!store) {
    return next(new ApiError('Invalid or expired verification token', 400));
  }

  // Mark the email as verified
  store.emailVerified = true;
  store.verificationToken = undefined;  // Clear verification token after successful verification
  await store.save();

  res.status(200).json({
    message: 'Email verified successfully!',
  });
});

exports.loginStore = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError("Please enter email and password", 400));
  }
  const store = await storeService.loginWithEmailAndPassword(email, password);
  res.cookie("token", store.token);
  sendToken(store, 200, res);
});


exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  await storeService.forgetPasswordService(req.body.email, req.protocol, req.get("host"));
  res.status(200).json({
    message: `Email sent to: ${req.body.email}`,
  });
});



exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params; 
  const { password, confirmPassword } = req.body; 
  await storeService.resetPasswordService(token, password, confirmPassword);
  res.status(200).json({
      message: 'Password has been reset successfully',
  }); 
});


/**
 * Controller to get a store by ID
 */
exports.getStoreById = catchAsyncErrors(async (req, res, next) => {
  const storeId = req.store._id;
  const store = await storeService.getStoreById(storeId);
  res.status(200).json({store});
});
exports.StoreById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const store = await storeService.getStoreById(id);
  res.status(200).json({store});
});

/**
 * Controller to get all stores with pagination
 */
exports.getAllStores = catchAsyncErrors(async (req, res, next) => {
  console.log(req.query)
  const { page, limit, sortBy } = req.query;
  const filter = {}; // Apply filters based on requirements
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: sortBy || "-createdAt",
  };
  const stores = await storeService.getAllStores(filter, options);
  res.status(200).json({
    success: true,
    stores,
  });
});

/**
 * Controller to update a store
 */
exports.updateStore = catchAsyncErrors(async (req, res, next) => {
  const storeId = req.params.storeId || req.store._id;
  const updateData = req.body;
  const updatedStore = await storeService.updateStoreById(storeId, updateData);
  res.status(200).json({
    success: true,
    message: "Store updated successfully",
    store: updatedStore,
  });
});

/**
 * Controller to delete a store
 */
exports.deleteStoreById = catchAsyncErrors(async (req, res, next) => {
  const storeId = req.params.storeId;
  await storeService.deleteStoreById(storeId);
  res.status(200).json({
    success: true,
    message: "Store deleted successfully",
  });
});



/**
 * controller to logout a store
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
exports.logoutStore = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return next(new ApiError("No token provided", 401));
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
        message: "Logged out successfully",
    });
    }
);
