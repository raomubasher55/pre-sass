const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllStoreOrders,
  updateOrderStatus,
  updatePaymentStatus,
  updateTrackingDetails,
  trackOrder,
  allOrders
} = require("../controllers/order.controller");
const {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedStore,
  authorizeRolesAndStoreAccess,
  isAuthenticatedStoreOrUser,
} = require("../middlewares/auth.middleware");



router.route('/all').get(isAuthenticatedUser , authorizeRoles('admin') , allOrders);
router.route("/store/orders").get(isAuthenticatedStore, getAllStoreOrders);
router.route("/:id").get(isAuthenticatedUser, getOrderById);
router.route("/").post(isAuthenticatedUser, createOrder);
router.route("/user/orders").get(isAuthenticatedUser, getUserOrders);
router.route("/:id/status").put(isAuthenticatedStore, updateOrderStatus);
router.put("/payment-status/:id", isAuthenticatedStore, updatePaymentStatus);
router
  .route("/:id/track")
  .get(
    isAuthenticatedStoreOrUser,
    authorizeRolesAndStoreAccess("admin", "storeowner"),
    trackOrder
  );
router.put("/update-tracking/:id", isAuthenticatedStore, updateTrackingDetails);

module.exports = router;
