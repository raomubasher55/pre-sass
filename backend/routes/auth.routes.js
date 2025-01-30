const express = require("express");
const multer = require('multer');
const path = require('path');
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  uploadDocument,
  getAllDocuments,
  deleteDocument,
  getPendingDocuments,
  approveDocument,
  rejectDocument,
} = require("../controllers/auth.controller");
const { authorizeRoles, isAuthenticatedUser, isAuthenticatedStore } = require("../middlewares/auth.middleware");
const { imageUpload } = require("../middlewares/multer.middleware");
const router = express.Router();



// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents'); // Save files in this directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes

router.route("/register").post(imageUpload.single('photo'),registerUser); //done
router.route("/login").post(loginUser);  //done
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);  //done


// seller
// Route to upload a document
router.post('/doc', isAuthenticatedStore, upload.single('document'), uploadDocument);  //done
router.get('/doc', isAuthenticatedUser, authorizeRoles('admin'), getAllDocuments); 
router.get('/pending-doc' , isAuthenticatedUser , authorizeRoles('admin') , getPendingDocuments) //done
router.delete('/doc/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteDocument); //done
router.put('/store/:storeId/document/:documentId/approve', isAuthenticatedUser, authorizeRoles('admin'), approveDocument); //done
router.put('/store/:userId/document/:documentId/reject', isAuthenticatedUser, authorizeRoles('admin') , rejectDocument);  //done


module.exports = router;
