const Order = require("../models/order.model");
const Store = require("../models/store.model");
const User = require('../models/user.model');
const ApiError = require("../utils/ApiError");
const { getSocket } = require("../utils/socket");

// Create Order
exports.createOrder = async (orderData, user) => {
      const order = await Order.create(orderData);
      if (user) {
        await User.findByIdAndUpdate(user._id, {
          $push: { orders: order._id }, 
        });
      }
  
      if (order.store) {
        await Store.findByIdAndUpdate(order.store, {
          $push: { orders: order._id }, // Add the order ID to the store's orders array
        });
      }
  
      // Aggregate the total sales by summing up the total price of all orders
      const totalSales = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }, // Aggregate the total price of all orders
      ]);
  
      // Get the socket instance to emit the sales update in real time
      const io = getSocket();
      io.emit("sales-update", totalSales[0]?.totalSales || 0); // Emit the total sales value, default to 0 if no total sales found
  
      // Return the created order
      return order;
    
  };
  
exports.getUserOrders = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate("orderItems.product");
    return orders;
  } catch (error) {
    throw new Error("Error fetching user orders");
  }
};
exports.getOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate("orderItems.product");
  if (!order) {
    throw new ApiError("Order not found.", 404);
  }
  return order;
};


exports.getAllStoreOrders = async (store) => {
  if (!store || !store._id) {
    throw new ApiError("Invalid store information provided", 400);
  }

  // Check if the store exists in the database
  const storeExists = await Store.findById(store._id);
  if (!storeExists) {
    throw new ApiError("Store not found", 404);
  }

  const orders = await Order.find({ store: store._id })
    .populate("user")
    .populate("orderItems.product");

  if (!orders.length) {
    throw new ApiError("No orders found for this store", 404);
  }

  return orders;
};

// orderService.js
exports.getAllOrders = async () => {
    try {
        // Fetch all orders from MongoDB
        const orders = await Order.find();
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};


// Update Order Status
exports.updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError("Order not found.", 404);
  }

  const previousStatus = order.orderStatus;

  order.orderStatus = status;

  order.trackingDetails = {
    status: order.orderStatus, // New status
    updatedAt: Date.now(), // Timestamp of update
    previousStatus: previousStatus, // Optionally save the previous status for reference
  };

  // Save the updated order
  await order.save();
  return order;
};

// Track Order
exports.trackOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError("Order not found.", 404);
  }
  return order.trackingDetails;
};

exports.updatePaymentStatus = async (orderId, paymentStatus) => {
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError("Order not found", 404);

  if (order.paymentInfo.method === "COD") {
    if (!["pending", "paid", "failed", "refunded"].includes(paymentStatus)) {
      throw new ApiError("Invalid payment status", 400);
    }

    order.paymentInfo.status = paymentStatus;
    order.paidAt = paymentStatus === "Paid" ? Date.now() : null;

    await order.save();

    const io = getSocket();
    io.emit("payment-status-update", { orderId, paymentStatus });

    return order;
  } else {
    throw new ApiError("Payment method is not COD", 400);
  }
}; 

exports.updateTrackingDetails = async (orderId, trackingDetails) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError("Order not found.", 404);
  }

  if (order.orderStatus === "shipped" || order.orderStatus === "processing") {
    order.trackingDetails = {
      courier: trackingDetails.courier || "",
      trackingNumber: trackingDetails.trackingNumber || "",
      estimatedDelivery: trackingDetails.estimatedDelivery || null,
    };
    await order.save();
    return order;
  } else {
    throw new ApiError(
      "Tracking details can only be updated for 'Shipped' or 'Processing' orders.",
      400
    );
  }
};
