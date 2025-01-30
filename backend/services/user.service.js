const {default : httpStatus} = require('http-status');
const User = require('../models/user.model')
const ApiError = require('../utils/ApiError');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('./email.service');


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody, avatar) => {
  console.log(userBody);

  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError('Email already taken', 401);
  }

  const user = await User.create({
    ...userBody, 
    avatar, 
  });

  return user;
};



/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError('Incorrect email or password', 401);
    }
    return user;
};



/**
 * Forgot password
 * @param {string} email
 * @param {string} protocol
 * @param {string} host
 * @returns {Promise<void>}
 */
const forgetPasswordService = async (email, protocol, host) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail(user.email, resetToken , host , protocol);
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError('Email could not be sent', 500);
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

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError('Invalid token or token is expired', 400);
  }

  if (password !== confirmPassword) {
    throw new ApiError('Passwords do not match', 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save({ validateBeforeSave: false });
};



/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  let user =  await User.findById(id).lean();
  console.log(user);
  if(!user){
    throw new ApiError(httpStatus.FORBIDDEN,'User Not Found!')
  }
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  const usera=await User.findOne({ email:email }).select('+password');
  return usera
};

const updateUserByEmail= async(email,password) => {
  return await User.findOneAndUpdate({email:email},{"password":password});
}
const updateUser = async (query,body) =>{
  return await User.findOneAndUpdate(query,body);
}
const getUserByAddress = async (address) => {
  return User.findOne({ address }).lean();
};

// /**
//  * Get user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const blockUserById = async (userId,updateBody)=>{
//   const user = await User.findByIdAndUpdate(userId,updateBody,{new:true}).lean()
//   return user;
// }

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId,updateBody, {
    new: true,
  });
  console.log("Updated User =>",user);
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await User.findByIdAndDelete(userId);
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} artworkId
 * @returns {Promise<User>}
 */
const addArtworkToFavourites = async (userId, artworkId) => {
  return await User.findOneAndUpdate({ _id: userId }, { $push: { favouriteArtworks: artworkId } }).lean();
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} artworkId
 * @returns {Promise<User>}
 */
const removeArtworkFromFavourite = async (userId, artworkId) => {
  return await User.findOneAndUpdate({ _id: userId }, { $pull: { favouriteArtworks: artworkId } }).lean();
};

/**
 *
 * @param {ObjectId} userId
 * @param {number} page
 * @param {number} perPage
 */

const getFavouriteArtworks = async (userId, page, perPage) => {
  const user = await User.findOne({ _id: userId })
    .select(['favouriteArtworks'])
    .populate('favouriteArtworks')
    .limit(parseInt(perPage))
    .skip(page * perPage)
    .lean();

  return user ? user.favouriteArtworks : [];
};

const followOtherUser = async (userId, otherUserId) => {
  await User.findOneAndUpdate({ _id: otherUserId }, { $push: { followers: userId } }, { new: true });
  return await User.findOneAndUpdate({ _id: userId }, { $push: { following: otherUserId } }, { new: true }).lean();
};

const unFollowUser = async (userId, otherUserId) => {
  await User.findOneAndUpdate({ _id: otherUserId }, { $pull: { followers: userId } }, { new: true });
  return await User.findOneAndUpdate({ _id: userId }, { $pull: { following: otherUserId } }, { new: true }).lean();
};

const getUserFollowers = async (userId, page, perPage) => {
  const user = await User.findOne({ _id: userId })
    .populate({
      path: 'followers',
      options: {
        limit: parseInt(perPage),
        skip: page * perPage,
      },
    })
    .lean();
  return user.followers;
};

const getUserFollowing = async (userId, page, perPage) => {
  const user = await User.findOne({ _id: userId })
    .populate({
      path: 'following',
      options: {
        limit: parseInt(perPage),
        skip: page * perPage,
      },
    })
    .lean();
  return user.following;
};

const removeArtwork = async (userId, artworkId) => {
  await User.findOneAndUpdate({ _id: userId }, { $pull: { artworks: artworkId } });
};

const searchUsersByName = async (keyword, page, perPage) => {
  return await User.find({ userName: { $regex: keyword, $options: 'i' } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};

const saveForgotPasswordCode= async(email, code) => {
  return await User.findOneAndUpdate({email:email},{$set:{"code":code}});
}

const addCategories = async(userId,categories,selectedSubCategoryPercentage)=>{
  const user = await User.findByIdAndUpdate(userId,
    {category:categories,sub_category_percentage:selectedSubCategoryPercentage},
    {new:true});
  return user;
}

module.exports = {
  createUser,
  loginWithEmailAndPassword,
  forgetPasswordService,
  resetPasswordService,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserByEmail,
  updateUser,
  updateUserById,
  deleteUserById,
  getUserByAddress,
  addArtworkToFavourites,
  removeArtworkFromFavourite,
  getFavouriteArtworks,
  
  followOtherUser,
  unFollowUser,
  getUserFollowers,
  getUserFollowing,
  removeArtwork,
  searchUsersByName,
  saveForgotPasswordCode,
  addCategories,
};
