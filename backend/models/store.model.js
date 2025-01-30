const { default: status } = require("http-status");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter store name"],
      unique: true,
      trim: true,
      maxlength: [50, "Store name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter store description"],
      maxlength: [500, "Store description cannot exceed 500 characters"],
    },
    address: {
      type: String,
      required: [true, "Please enter store address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
    phone: {
      type: String,
      required: [true, "Please enter store phone number"],
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter store email address"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 character"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Orders",
      },
    ],
    photo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    package: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
      name: {
        type: String,
      },
      expiresAt: {
        type: Date,
      },
    },
    documents: [
      {
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
        fileName: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          // enum: ["PDF", "PNG", "JPG"],
          required: true,
        },
        filePath: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "approved"],
          default: "pending",
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

storeSchema.plugin(mongoosePaginate);

storeSchema.pre("save", function (next) {
  this.address = this.address.toLowerCase();
  next();
});

storeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // ensure we don't delay the process
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

storeSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

storeSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

storeSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

storeSchema.methods.getResetPasswordToken = function () {
  // Genrate Toekn
  const resetToken = crypto.randomBytes(20).toString("hex");
  // hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // set token expires time
  this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("Store", storeSchema);
