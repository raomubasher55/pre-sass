const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth.middleware"); 
const { createAd, updateAd, deleteAd, getActiveAds, getActiveAdById } = require("../controllers/ad.controller");
const { imageUpload } = require("../middlewares/multer.middleware");

router.route("/").post(isAuthenticatedUser, authorizeRoles("admin"), imageUpload.single('image'), createAd); //done
router.route("/:id").put(isAuthenticatedUser, authorizeRoles("admin"), imageUpload.single('image'), updateAd); //done
router.route("/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAd); //done
router.route("/active").get(getActiveAds); //done
router.route("/active/:id").get(getActiveAdById); //done

module.exports = router;
