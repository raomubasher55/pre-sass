const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.middleware');
const { getAllUsers, updateUserRole, deleteUser, updateUserProfile, getProfile } = require('../controllers/user.controller');

const router = express.Router();

 
router.route('/profile').get(isAuthenticatedUser, getProfile);                   
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

// http://localhost:4000/api/v1/admin/users/67648fcb420dcebb733e6077/admin
router.route('/admin/users/:userId/:role').put( isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);

router.route("/update-profile").put(isAuthenticatedUser , updateUserProfile);

router.route('/admin/users/:userId').delete( isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
