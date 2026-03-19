const express = require("express");
const router = express.Router({ mergeParams: true }); //Isse parent route ka :slug router me available ho jayega
const{authMiddleware} = require("../../middleware/authMiddleware");

const {storeAccessMiddleware} = require("../../middleware/storeMiddleware");
const upload = require("../../config/multer");
const { getCategory, getSubCategory, createProducts, getProduct,getSingleProduct, update, deleteProducts,statusProducts } =
require("../../controllers/merchant/productController");

router.get("/category", authMiddleware, getCategory);

router.get("/subCategory/:categoryId", authMiddleware, getSubCategory);

router.post("/product", authMiddleware, storeAccessMiddleware, upload.single("image"),  createProducts);

router.get("/products", authMiddleware, storeAccessMiddleware, getProduct)

router.get("/product/:id", authMiddleware, storeAccessMiddleware, getSingleProduct);

router.put("/update-product/:id", authMiddleware, storeAccessMiddleware, upload.single("image"), update);

router.delete("/deleted-product/:id", authMiddleware, storeAccessMiddleware, deleteProducts);

router.put("/status-product/:id", authMiddleware, storeAccessMiddleware, statusProducts)
module.exports = router;