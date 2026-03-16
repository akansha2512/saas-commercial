const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {superAdminMiddleware} = require("../middleware/superAdminMiddleware");
const {storeCategory, getCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");

router.post("/store", authMiddleware, superAdminMiddleware, storeCategory);
router.get("/list-category", authMiddleware, superAdminMiddleware, getCategory )
router.put("/update-category/:id", authMiddleware, superAdminMiddleware, updateCategory)
router.delete("/delete-category/:id", authMiddleware, superAdminMiddleware, deleteCategory)

module.exports =router;
