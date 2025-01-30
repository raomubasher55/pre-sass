const express = require('express');
const router = express.Router();
const { isAuthenticatedStore, authorizeRoles, isAuthenticatedUser } = require('../middlewares/auth.middleware');
const { validateStore } = require('../validators/store.validator');
const { createStore, loginStore, updateStore, getStoreById, getAllStores, logoutStore, verifyEmail, forgotPassword, resetPassword, StoreById} = require('../controllers/store.controller');
const { imageUpload } = require('../middlewares/multer.middleware');

router.route('/register').post(imageUpload.single('photo'), validateStore, createStore); //done
router.route('/verify-email').get(isAuthenticatedStore , verifyEmail);
router.route('/login').post(loginStore);  //done
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route('/profile').get(isAuthenticatedStore, getStoreById ); //done
router.route('/store/:id').get( StoreById ); //done
router.route('/update-profile').put(isAuthenticatedStore , updateStore); //done
router.route('/all').get(isAuthenticatedUser, authorizeRoles('admin'), getAllStores); //done
router.route('/all-store').get(getAllStores); 
router.route('/logout').get(isAuthenticatedStore , logoutStore); //done

module.exports = router;