// const Ad = require("../models/ad.model");
// const Product = require("../models/product.model");
// const ApiError = require("../utils/ApiError"); 


// exports.createAd = async (req, res, next) => {
//   try {
//     const { title, description, product, startDate, endDate } = req.body;

//     // Validate if the product exists
//     const productExists = await Product.findById(product);
//     if (!productExists) {
//       return next(new ApiError("Product does not exist", 400));
//     }

//     // Handle the image (using multer for file upload)
//     const image = req.file ? req.file.path : null; 

//     // Create the ad object
//     const ad = new Ad({
//       title,
//       description,
//       image,
//       product,
//       startDate,
//       endDate,
//     });

//     ad.updateAdStatus();

//     // Save the ad to the database
//     await ad.save();

//     // Send the response with the newly created ad
//     res.status(201).json({
//       success: true,
//       message: "Advertisement created successfully",
//       ad,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

  
//   // Update an ad
//   exports.updateAd = async (req, res, next) => {
//     try {
//       const ad = await Ad.findById(req.params.id);
  
//       if (!ad) {
//         return next(new ApiError("Ad not found", 404));
//       }
  
//       const { title, description, product, startDate, endDate, active } = req.body;
  
//       // Handle the image if uploaded
//       const image = req.file ? req.file.path : ad.image; // If new image uploaded, use that, otherwise keep the existing image
  
//       ad.title = title || ad.title;
//       ad.description = description || ad.description;
//       ad.image = image;
//       ad.product = product || ad.product;
//       ad.startDate = startDate || ad.startDate;
//       ad.endDate = endDate || ad.endDate;
//       ad.active = active !== undefined ? active : ad.active;
  
//       await ad.save();
  
//       res.status(200).json({
//         success: true,
//         message: "Advertisement updated successfully",
//         ad,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

// // Delete an ad
// exports.deleteAd = async (req, res, next) => {
//   try {
//     const ad = await Ad.findById(req.params.id);

//     if (!ad) {
//       return next(new ApiError("Ad not found", 404));
//     }

//     await ad.remove();

//     res.status(200).json({
//       success: true,
//       message: "Advertisement deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Fetch active ads
// exports.getActiveAds = async (req, res, next) => {
//   try {
//     const currentDate = new Date();

//     const activeAds = await Ad.find({
//       active: true,
//       startDate: { $lte: currentDate },
//       endDate: { $gte: currentDate },
//     }).populate("product");

//     res.status(200).json({
//       success: true,
//       ads: activeAds,
//     });
//   } catch (error) {
//     next(error);
//   }
// };





const adService = require("../services/ad.service");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");

exports.createAd = catchAsyncErrors(async (req, res, next) => {
  const adData = req.body;
  const filePath = req.file ? req.file.path : null;
  const ad = await adService.createAd(adData, filePath);

  res.status(201).json({
    success: true,
    message: "Advertisement created successfully",
    ad,
  });
});

exports.updateAd = catchAsyncErrors(async (req, res, next) => {
  const adId = req.params.id;
  const adData = req.body;
  const filePath = req.file ? req.file.path : null;

  const ad = await adService.updateAd(adId, adData, filePath);

  res.status(200).json({
    success: true,
    message: "Advertisement updated successfully",
    ad,
  });
});

exports.deleteAd = catchAsyncErrors(async (req, res, next) => {
  const adId = req.params.id;
console.log(adId)
  await adService.deleteAd(adId);

  res.status(200).json({
    success: true,
    message: "Advertisement deleted successfully",
  });
});

exports.getActiveAds = catchAsyncErrors(async (req, res, next) => {
  try {
    const activeAds = await adService.getActiveAds();

    if (!activeAds || activeAds.length === 0) {
      return res.status(404).json({ success: false, message: "No active ads found" });
    }

    res.status(200).json({
      success: true,
      ads: activeAds,
    });
  } catch (error) {
    console.error("Error fetching active ads:", error);
    next(error);
  }
});



// Get a single active ad by ID
exports.getActiveAdById = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const activeAd = await adService.getActiveAdById(id);
    
    res.status(200).json({
      success: true,
      ad: activeAd,
    });
  } catch (error) {
    console.error("Error fetching active ad by ID:", error);
    next(error);
  }
});

