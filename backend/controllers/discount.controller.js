const catchAsyncErrors = require('../middlewares/catchAsyncErrors.middleware');
const discountService = require('../services/discount.service');

exports.updateDiscount = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;
  const { discountPercentage, discountStartDate, discountEndDate } = req.body;

  const updatedProduct = await discountService.updateProductDiscount(
    productId,
    discountPercentage,
    discountStartDate,
    discountEndDate
  );

  res.status(200).json({
    success: true,
    message: "Product discount updated successfully",
    product: updatedProduct,
  });
});

exports.removeDiscount = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.params;

  // Call service to remove product discount
  const updatedProduct = await discountService.removeProductDiscount(productId);

  res.status(200).json({
    success: true,
    message: "Product discount removed successfully",
    product: updatedProduct,
  });
});
