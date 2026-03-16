const express = require("express");
const router = express.Router({ mergeParams: true }); //Isse parent route ka :slug router me available ho jayega
const{authMiddleware} = require("../../middleware/authMiddleware");

const {storeAccessMiddleware} = require("../../middleware/storeMiddleware");
const upload = require("../../config/multer");
const { getCategory, getSubCategory, createProducts } =
require("../../controllers/merchant/productController");
router.get("/category", authMiddleware, getCategory);

router.get("/subCategory/:categoryId", authMiddleware, getSubCategory);

router.post("/product", authMiddleware, storeAccessMiddleware, upload.single("image"),  createProducts);

module.exports = router;