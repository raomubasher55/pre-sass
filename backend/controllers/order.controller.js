// const Order = require("../models/order.model");
// const Product = require("../models/product.model");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
// const ApiError = require("../utils/ApiError");

// //  create a new order => /api/v1/order/new

// exports.newOrder = catchAsyncErrors(async (req, res, next) => {
//   const {
//     orderItems,
//     shippingInfo,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     paymentInfo,
//   } = req.body;

//   const order = await Order.create({
//     orderItems,
//     shippingInfo,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     paymentInfo,
//     paidAt: Date.now(),
//     user: req.user._id,
//   });

//   const totalSales = await Order.aggregate([
//     { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
//   ]);

//   // Emit the updated total sales to all clients
//   io.emit('sales-update', totalSales[0]?.totalSales || 0);

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

// exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id).populate(
//     "user",
//     "name email"
//   );

//   if (!order) {
//     return next(new ApiError("No Order found with this ID", 404));
//   }

//   res.status(200).json({
//     success: true,
//     order,
//   });
// });

// // Get logged in user orders   =>   /api/v1/orders/me
// exports.myOrders = catchAsyncErrors(async (req, res, next) => {
//   const orders = await Order.find({ user: req.user._id });

//   res.status(200).json({
//     success: true,
//     orders,
//   });
// });

// // Get all orders - ADMIN  =>   /api/v1/admin/orders/
// exports.allOrders = catchAsyncErrors(async (req, res, next) => {
//   const orders = await Order.find();

//   let totalAmount = 0;

//   orders.forEach((order) => {
//     totalAmount += order.totalPrice;
//   });

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     orders,
//   });
// });


// async function updateStock(id, quantity) {
//     const product = await Product.findById(id);
  
//     if (!product) {
//       throw new ApiError("Product not found", 404); // Handle with custom error
//     }
//     product.stock = product.stock - quantity;
  
//     await product.save({ validateBeforeSave: false })
//   }
  

// // Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
// exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if(!order){
//     return next(new ApiError("Can not found order", 400));
//   }

//   // Check if the order has already been delivered
//   if (order.orderStatus === "Delivered") {
//     return next(new ApiError("You have already delivered this order", 400));
//   }

//   // Use for...of loop to handle async operations correctly
//   for (let item of order.orderItems) {
//     console.log(item)
//     await updateStock(item.product, item.quantity);
//   }

//   // Update the order status and delivery timestamp
//   order.orderStatus = req.body.orderStatus;
//   order.deliveredAt = Date.now();

//   // Save the updated order
//   await order.save({ validateBeforeSave: false });

//   // Respond with success
//   res.status(200).json({
//     success: true,
//     message: "Order updated successfully",
//   });
// });


// exports.updateTrackingDetails =catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { orderId } = req.params;
//     const { courier, trackingNumber, estimatedDelivery, status } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return next(new ApiError('Order not found', 404));
//     }

//     // Update tracking details and status
//     if (courier) order.trackingDetails.courier = courier;
//     if (trackingNumber) order.trackingDetails.trackingNumber = trackingNumber;
//     if (estimatedDelivery) order.trackingDetails.estimatedDelivery = estimatedDelivery;
//     if (status) order.orderStatus = status;

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order tracking details updated successfully',
//       order,
//     });
//   } catch (error) {
//     next(error);
//   }
// });


// exports.getTrackingDetails =catchAsyncErrors (async (req, res, next) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId).select('trackingDetails orderStatus');
//     if (!order) {
//       return next(new ApiError('Order not found', 404));
//     }

//     res.status(200).json({
//       success: true,
//       trackingDetails: order.trackingDetails,
//       orderStatus: order.orderStatus,
//     });
//   } catch (error) {
//     next(error);
//   }
// });


// // Delete order   =>   /api/v1/admin/order/:id
// exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ApiError("No Order found with this ID", 404));
//   }


//   await order.deleteOne();

//   res.status(200).json({
//     success: true,
//     message: "Order deleted successfully ",
//   });
// });





const catchAsyncErrors = require("../middlewares/catchAsyncErrors.middleware");
const orderService = require("../services/order.service");

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    storeId
  } = req.body;

  const orderData = {
    user: req.user._id, 
    store: storeId,
    shippingInfo,
    orderItems,
    paymentInfo: { 
      method: paymentInfo.method, // COD or Online
      status: paymentInfo.method === 'COD' ? 'pending' : 'paid', // COD orders are pending until paid
    },
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paidAt: paymentInfo.method === 'Online' ? Date.now() : null, 
    
  };

  const order = await orderService.createOrder(orderData , req.user);

  res.status(201).json({
    success: true,
    order,
  });
});


exports.getUserOrders = async (req, res, next) => {
  try {
    // Get orders using the service method
    const orders = await orderService.getUserOrders(req.user._id);

    // If no orders found, return a 404 response
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    // Return the orders in the response
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};


exports.updatePaymentStatus = catchAsyncErrors(async (req, res, next) => {
  const { paymentStatus } = req.body;
  const { id } = req.params;
  const order = await orderService.updatePaymentStatus(id, paymentStatus);
  res.status(200).json({
    success: true,
    message: `Payment status for Order ID: ${id} updated to ${paymentStatus}`,
    order,
  });
});

// Get Order by ID
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await orderService.getOrderById(req.params.id);

  res.status(200).json({
    success: true,
    order,
  });
});

// Update Order Status
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const order = await orderService.updateOrderStatus(req.params.id, status);

  res.status(200).json({
    success: true,
    message: `Order status updated to ${status}`,
    order,
  });
});

// Get All Orders store
exports.getAllStoreOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderService.getAllStoreOrders(req.store);

  res.status(200).json({
    success: true,
    orders,
  });
});

// Track Order
exports.trackOrder = catchAsyncErrors(async (req, res, next) => {
  const trackingDetails = await orderService.trackOrder(req.params.id);

  res.status(200).json({
    success: true,
    trackingDetails,
  });
});



exports.updateTrackingDetails = catchAsyncErrors(async (req, res, next) => {
  const { trackingDetails } = req.body; 
  const order = await orderService.updateTrackingDetails(req.params.id, trackingDetails);
  res.status(200).json({
    success: true,
    message: "Tracking details updated successfully.",
    order,
  });
});


exports.allOrders = catchAsyncErrors(async (req, res) => {
  try {
      const orders = await orderService.getAllOrders();
      res.status(200).json({ success: true, orders }); 
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
});
Error 