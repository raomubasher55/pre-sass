const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter ad title"],
  },
  description: {
    type: String,
    required: [true, "Please enter ad description"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Please provide the product for this ad"],
  },
  startDate: {
    type: Date,
    required: [true, "Please provide ad start date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please provide ad end date"],
  },
  image: {
    type: String,
    // required: [true, "Please provide the image path"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",  // Set initial status to inactive
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to automatically set ad status based on current date
adSchema.methods.updateAdStatus = function () {
  const currentDate = new Date();

  // Set ad status to active if current date is between start and end dates
  if (currentDate >= this.startDate && currentDate <= this.endDate) {
    this.status = "active";
  } else {
    this.status = "inactive";
  }
};

module.exports = mongoose.model("Ad", adSchema);
