const Package = require("../models/Package.model.js");
const Store  = require('../models/store.model.js');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiError.js");

const packageData = {
  Self: {
    name: "Self",
    price: 500,
    features: {
      productLimit: 10,
      support: "Basic Email Support",
      analytics: "Basic Analytics",
      paymentGateways: "Standard Gateways",
      marketingTools: false,
      globalReach: false,
      referralProgram: false,
      transactionLimits: "Up to $500/month",
    },
  },
  Medium: {
    name: "Medium",
    price: 1000,
    features: {
      productLimit: 50,
      support: "Priority Email Support",
      analytics: "Advanced Analytics",
      paymentGateways: "Standard + Premium Gateways",
      marketingTools: true,
      globalReach: true,
      referralProgram: true,
      transactionLimits: "Up to $2000/month",
    },
  },
  Enterprise: {
    name: "Enterprise",
    price: 5000,
    features: {
      productLimit: 100,
      support: "24/7 Support",
      analytics: "Full Analytics Suite",
      paymentGateways: "All Gateways + Custom Integrations",
      marketingTools: true,
      globalReach: true,
      referralProgram: true,
      transactionLimits: "Up to $50,000/month",
    },
  },
  Large: {
    name: "Large",
    price: 15000,
    features: {
      productLimit: 500,
      support: "Dedicated Account Manager",
      analytics: "Custom Analytics and Reporting",
      paymentGateways: "All Gateways + Custom Integrations",
      marketingTools: true,
      globalReach: true,
      referralProgram: true,
      transactionLimits: "Unlimited",
    },
  },
};

const createPackageAndProcessPayment = async (store, packageType, paymentMethod) => {
    // if (!store || !store._id) {
    //   throw new ApiError("Invalid store object", 400);
    // }
  
    // if (!packageData[packageType]) {
    //   throw new ApiError("Invalid package type selected", 400);
    // }
  
    const selectedPackage = packageData[packageType];
  
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: selectedPackage.price * 100,
    //   currency: "usd",
    //   payment_method: paymentMethod,
    //   confirm: true,
    // });
  
    // if (!paymentIntent || paymentIntent.status !== "succeeded") {
    //   throw new ApiError("Payment failed", 400);
    // }
    
    let newPackage;
    if (store.package && store.package.id) {
      newPackage = await Package.findByIdAndUpdate(
        store.package.id,
        {
          ...selectedPackage,
          isActive: true,
        },
        { new: true }
      );
    } else {
      newPackage = await Package.create({
        seller: store?._id,
        isActive: true,
        ...selectedPackage,
      });
    }
  
    store.package = {
      id: newPackage._id,
      name: newPackage.name,
      expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    };
  
    await store.save();
  
    return { userPackage: store.package, newPackage };
  };
  
  
  
const getAllPackages = async () => {
  return await Package.find().populate('seller', 'email documents name package');
};

const getPackageById = async (packageId) => {
  const package = await Package.findById(packageId);
  if (!package) {
    throw new ApiError("Package not found", 404);
  }
  return package;
};

const updatePackage = async (packageId, packageData) => {
  const updatedPackage = await Package.findByIdAndUpdate(packageId, 
    {...packageData}, {
    new: true,
    runValidators: true,
  });
  if (!updatedPackage) {
    throw new ApiError("Package not found", 404);
  }
  return updatedPackage;
};

const deletePackage = async (packageId) => {
    const packageToDelete = await Package.findById(packageId);
    if (!packageToDelete) {
      throw new ApiError("Package not found", 404);
    }
  
    const sellerId = packageToDelete.seller;
  
    const deletedPackage = await Package.findByIdAndDelete(packageId);
  
    const store = await Store.findById(sellerId);
    if (store) {
      store.package = null;
      await store.save();
    }
  
    return deletedPackage;
  };
  

const processPayment = async (store, packageId, paymentMethod) => {
  // Get the selected package
  const selectedPackage = await Package.findById(packageId);
  if (!selectedPackage) {
    throw new ApiError("Package not found", 404);
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: selectedPackage.price * 100, // Convert to cents
    currency: "usd",
    payment_method: paymentMethod,
    confirm: true,
  });

  if (!paymentIntent || paymentIntent.status !== "succeeded") {
    throw new ApiError("Payment failed", 400);
  }

  // Update the user's package
  store.package = {
    id: selectedPackage._id,
    name: selectedPackage.name,
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Add 1 month for the subscription expiry
  };

  // Save the updated user details
  await store.save();

  return store.package;
};

module.exports = {
  createPackageAndProcessPayment,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  processPayment,
};
