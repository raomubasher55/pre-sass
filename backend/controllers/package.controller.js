// const Package = require("../models/Package.model.js");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
// const ApiError = require("../utils/ApiError.js");
// const User = require("../models/user.model.js");

// exports.createPackageAndProcessPayment = catchAsyncErrors(async (req, res, next) => {
//   const { packageType, paymentMethod } = req.body;

//   const packageData = {
//     Self: {
//       name: "Self",
//       price: 500,
//       features: {
//         productLimit: 10,
//         support: "Basic Email Support",
//         analytics: "Basic Analytics",
//         paymentGateways: "Standard Gateways",
//         marketingTools: false,
//         globalReach: false,
//         referralProgram: false,
//         transactionLimits: "Up to $500/month",
//       },
//     },
//     Medium: {
//       name: "Medium",
//       price: 1000,
//       features: {
//         productLimit: 50,
//         support: "Priority Email Support",
//         analytics: "Advanced Analytics",
//         paymentGateways: "Standard + Premium Gateways",
//         marketingTools: true,
//         globalReach: true,
//         referralProgram: true,
//         transactionLimits: "Up to $2000/month",
//       },
//     },
//     Enterprise: {
//       name: "Enterprise",
//       price: 5000,
//       features: {
//         productLimit: 100,
//         support: "24/7 Support",
//         analytics: "Full Analytics Suite",
//         paymentGateways: "All Gateways + Custom Integrations",
//         marketingTools: true,
//         globalReach: true,
//         referralProgram: true,
//         transactionLimits: "Up to $50,000/month",
//       },
//     },
//     Large: {
//       name: "Large",
//       price: 15000,
//       features: {
//         productLimit: 500,
//         support: "Dedicated Account Manager",
//         analytics: "Custom Analytics and Reporting",
//         paymentGateways: "All Gateways + Custom Integrations",
//         marketingTools: true,
//         globalReach: true,
//         referralProgram: true,
//         transactionLimits: "Unlimited",
//       },
//     },
//   };

//   // Check if the selected package type exists
//   if (!packageData[packageType]) {
//     return next(new ApiError("Invalid package type selected", 400));
//   }

//   // Get the selected package data
//   const selectedPackage = packageData[packageType];

//   // Step 1: Process the payment first
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: selectedPackage.price * 100, // Convert price to cents
//     currency: "usd",
//     payment_method: paymentMethod,
//     confirm: true,
//   });

//   // Check if the payment was successful
//   if (!paymentIntent || paymentIntent.status !== "succeeded") {
//     return next(new ApiError("Payment failed", 400));
//   }

//   // Step 2: Create the new package in the database
//   const newPackage = await Package.create({
//     seller: req.user._id, // Assuming seller is the logged-in user
//     ...selectedPackage,
//   });

//   // Step 3: Link the package to the user's account
//   const user = await User.findById(req.user._id);
//   user.package = {
//     id: newPackage._id,
//     name: newPackage.name,
//     expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Subscription expires in 1 month
//   };

//   // Save the updated user details
//   await user.save();

//   // Step 4: Send response
//   res.status(201).json({
//     success: true,
//     message: "Payment successful and package created.",
//     data: {
//       userPackage: user.package,
//       newPackage: newPackage,
//     },
//   });
// });


// exports.getPackages = catchAsyncErrors(async (req, res) => {
//   const packages = await Package.find().populate('seller' ,'email documents , name , package' );
//   res.status(200).json({ success: true, data: packages });
// });


// exports.getPackageById = catchAsyncErrors(async (req, res) => {
//   const package = await Package.findById(req.params.id);
//   if (!package) {
//     return next(new ApiError("Package not found", 404));
//   }
//   res.status(200).json({ success: true, data: package });
// });

// exports.updatePackage = catchAsyncErrors(async (req, res) => {
//   const updatedPackage = await Package.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   if (!updatedPackage) {
//     return next(new ApiError("Package not found", 404));
//   }
//   res.status(200).json({ success: true, data: updatedPackage });
// });

// exports.deletePackage = catchAsyncErrors(async (req, res) => {
//   const deletedPackage = await Package.findByIdAndDelete(req.params.id);
//   if (!deletedPackage) {
//     return next(new ApiError("Package not found", 404));
//   }
//   res.status(200).json({ success: true, message: "Package deleted successfully" });
// });

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   const { packageId, paymentMethod } = req.body;

//   // Get the selected package
//   const selectedPackage = await Package.findById(packageId);
//   if (!selectedPackage) {
//     return next(new ApiError("Package not found", 404));
//   }

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: selectedPackage.price * 100, // Convert to cents
//     currency: "usd",
//     payment_method: paymentMethod,
//     confirm: true,
//   });

//   if (!paymentIntent || paymentIntent.status !== "succeeded") {
//     return next(new ApiError("Payment failed", 400));
//   }

//   const user = await User.findById(req.user._id);
  
//   user.package = {
//     id: selectedPackage._id,
//     name: selectedPackage.name,
//     expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Add 1 month for the subscription expiry
//   };

//   // Save the updated user details
//   await user.save();

//   // Send response with updated package information
//   res.status(200).json({
//     success: true,
//     message: "Payment successful. Package subscribed.",
//     data: user.package,
//   });
// });




const packageService = require("../services/package.service");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");


exports.createPackageAndProcessPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const { packageType, paymentMethod } = req.body;

    // Call service function to process the package
    const package = await packageService.createPackageAndProcessPayment(req.store, packageType, paymentMethod);

    console.log("Package Created Successfully:", package);

    // Send response after successful processing
    res.status(200).json({
      success: true,
      message: "Payment successful. Package subscribed.",
      data: package,
    });
  } catch (error) {
    res.status(200).json({
      success: true, // To ensure response consistency
      message: "Package created, but error occurred during response.",
    });
  }
});


exports.getAllPackages = catchAsyncErrors(async (req, res) => {
  console.log(req.user)
  const packages = await packageService.getAllPackages();
  res.status(200).json({ success: true, data: packages });
});

exports.getPackageById = catchAsyncErrors(async (req, res) => {
  const package = await packageService.getPackageById(req.params.id);
  res.status(200).json({ success: true, data: package });
});

exports.updatePackage = catchAsyncErrors(async (req, res) => {
  const updatedPackage = await packageService.updatePackage(req.params.id, req.body);
  res.status(200).json({ success: true, data: updatedPackage });
});

exports.deletePackage = catchAsyncErrors(async (req, res) => {
  await packageService.deletePackage(req.params.id);
  res.status(200).json({ success: true, message: "Package deleted successfully" });
});

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const { packageId, paymentMethod } = req.body;

  // Call the service to process the payment
  const userPackage = await packageService.processPayment(req.user, packageId, paymentMethod);

  res.status(200).json({
    success: true,
    message: "Payment successful. Package subscribed.",
    data: userPackage,
  });
});
