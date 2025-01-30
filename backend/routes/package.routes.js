const express = require("express");
const router = express.Router();
const {
  createPackageAndProcessPayment,
  getAllPackages, 
  getPackageById,
  updatePackage,
  deletePackage,
  // processPayment,
} = require("../controllers/package.controller");
const { isAuthenticatedUser, authorizeRoles, isAuthenticatedStore, authorizeRolesAndStoreAccess, isAuthenticatedStoreOrUser } = require("../middlewares/auth.middleware");

router.post("/", isAuthenticatedStore , createPackageAndProcessPayment);  //done

router.get("/",isAuthenticatedUser ,authorizeRoles('admin') ,  getAllPackages); //done

router.get("/:id" , isAuthenticatedStoreOrUser,
  authorizeRolesAndStoreAccess("admin", "storeowner"),  getPackageById); //done

router.put("/:id",isAuthenticatedUser , authorizeRoles('admin'), updatePackage); //done

router.delete("/:id",isAuthenticatedUser , authorizeRoles('admin') , deletePackage); //done

// router.post("/process", isAuthenticatedUser, processPayment);


module.exports = router;
