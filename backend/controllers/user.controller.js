const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");

// Update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, avatar } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (avatar) {
    updateData.avatar = {
      public_id: avatar.public_id,
      url: avatar.url,
    };
  }
  const user = await userService.updateUserById(req.user._id, updateData);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({message: "Profile updated successfully", user,});
});



exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    message: "Profile fetched successfully",
    user,
  });
});


// Get all users (accessible to superadmin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, limit = 10, sortBy } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sortBy: sortBy || "createdAt:desc", 
  };

  const filter = {}; // Add filters if needed, e.g., role or status

  const users = await userService.queryUsers(filter, options);

  res.status(200).json({
    users: users.docs, 
    page: users.page,
    totalPages: users.totalPages,
    totalUsers: users.totalDocs,
  });
});


// Update a user's role (admin, superadmin, or user)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { userId, role } = req.params;

  const validRoles = ["user", "admin", "superadmin"];
  if (!validRoles.includes(role)) {
    return next(new ApiError("Invalid role provided", 400));
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  if (
    userId.toString() === req.user.id.toString() &&
    req.user.role === "superadmin"
  ) {
    return next(new ApiError("Superadmin cannot change their own role", 400));
  }

  user.role = role;

  if (role === "admin" && Array.isArray(user.documents)) {
    user.documents.forEach((doc) => {
      doc.status = "approved";
    });
  }

  const updatedUser = await userService.updateUserById(userId, { role });

  res.status(200).json({
    success: true,
    message: `User role updated to ${role}`,
    user: {
      id: updatedUser._id,
      role: updatedUser.role,
    },
  });
});


// Delete a user (accessible to superadmin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  if (
    userId.toString() === req.user._id.toString() &&
    req.user.role === "superadmin"
  ) {
    return next(
      new ApiError("Superadmin cannot delete their own account", 400)
    );
  }
  await userService.deleteUserById(userId);
  res.status(200).json({ message: "User deleted successfully"});
});
