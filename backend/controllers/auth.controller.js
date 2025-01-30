const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const User = require("../models/user.model");
const Store = require('../models/store.model')
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const fs = require('fs');
const { createUser, loginWithEmailAndPassword, forgetPasswordService, resetPasswordService } = require("../services/user.service");


exports.registerUser = catchAsyncErrors(async (req, res) => {
  console.log(req.body);

  let avatar = { public_id: "", url: "" };

  if (req.file) {
    avatar = {
      public_id: req.file.filename,  
      url: `/uploads/${req.file.filename}`,  
    };
  }

  const user = await createUser(req.body, avatar);
  sendToken(user, 200, res);
});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError("Please enter email and password", 400));
  }
  const user = await loginWithEmailAndPassword(email , password);
  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
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
});

// exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
//   try {
//     await forgetPasswordService(req.body.email, req.protocol, req.get("host"));
//     res.status(200).json({
//       success: true,
//       message: `Email sent to: ${req.body.email}`,
//     });
//   } catch (error) {
//     next(error);
//   }
// });
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  await forgetPasswordService(req.body.email, req.protocol, req.get("host"));
  res.status(200).json({
    message: `Email sent to: ${req.body.email}`,
  });
});


exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params; 
  const { password, confirmPassword } = req.body; 
  await resetPasswordService(token, password, confirmPassword);
  res.status(200).json({
      message: 'Password has been reset successfully',
  }); 
});

 
// Documents

// Document upload
exports.uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError('No file uploaded', 400));
    }

    const {phone , category , name} = req.body;

    const documentData = {
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      filePath: req.file.path,
      phone,
      category,
      name,
    };

    const user = await Store.findByIdAndUpdate(
      req.store.id,
      { $push: { documents: documentData } },
      { new: true }
    );

    if (!user) {
      return next(new ApiError('User not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      document: documentData,
    });
  } catch (error) {
    next(error);
  }
};

// Get all documents (Superadmin)
exports.getAllDocuments = async (req, res, next) => {
  try {
    console.log(req.user)
    if (req.user.role !== 'admin') {
      return next(new ApiError('Access denied. Only admins can perform this action.', 403));
    }
    const stores = await Store.find({}).select('name email documents');
    console.log(stores)
    if (!stores || stores.length === 0) {
      return next(new ApiError('No stores found', 404));
    }
    const documents = stores.flatMap(store =>
      store.documents.map(doc => ({
        storeId: store._id,
        storeName: store.name,
        storeEmail: store.email,
        ...doc.toObject(),
      }))
    );

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

// Get documents with pending status

exports.getPendingDocuments = async (req, res, next) => {
  try {
    let documents = [];

    if (req.user.role === 'admin') {
      const stores = await Store.find({}).select('name email documents');
      if (!stores || stores.length === 0) {
        return next(new ApiError('No stores found', 404));
      }

      documents = stores.flatMap(store => 
        store.documents
          .filter(doc => doc.status === 'pending') 
          .map(doc => ({
            storeId: store._id,
            storeName: store.name,
            storeEmail: store.email,
            ...doc.toObject(),
          }))
      );
    } else {
      const store = await Store.findById(req.user._id).select('documents');
      if (!store) {
        return next(new ApiError('Store not found', 404));
      }
      documents = store.documents
        .filter(doc => doc.status === 'pending')
        .map(doc => doc.toObject());
    }

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    next(error);
  }
};


// Delete a document 
exports.deleteDocument = async (req, res, next) => {
  try {
    const store = await Store.findOne({ 'documents._id': req.params.id });
    if (!store) {
      return next(new ApiError('Store not found', 404));
    }

    const document = store.documents.id(req.params.id);
    if (!document) {
      return next(new ApiError('Document not found', 404));
    }
    await document.deleteOne();
    await store.save({ validateBeforeSave: false });

    fs.unlinkSync(document.filePath);

    res.status(200).json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};



exports.approveDocument = async (req, res) => {
  try {
    const { storeId, documentId } = req.params;
    
    const updatedStore = await Store.findOneAndUpdate(
      { _id: storeId, 'documents._id': documentId }, 
      { 
        $set: { 'documents.$.status': 'approved' }, 
      },
      { new: true }
    );
    if (!updatedStore) {
      return res.status(404).json({ message: 'Store or document not found' });
    }
    res.status(200).json({
      message: 'Document approved successfully',
      document: updatedStore.documents.id(documentId),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




exports.rejectDocument = async (req, res) => {
  try {
    const { storeId, documentId } = req.params;
        const store = await Store.findById(storeId);
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    const document = store.documents.id(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    document.status = 'rejected';
    await store.save(); 
    res.status(200).json({ message: 'Document rejected successfully', document });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
