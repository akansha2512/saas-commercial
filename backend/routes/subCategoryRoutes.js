const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {superAdminMiddleware} = require("../middleware/superAdminMiddleware");
const{saveCategory, getSubCategory, updateSubCategory, deleteCategory} = require("../controllers/subcategoryController");

router.post("/:categoryId/subcategories/save",  authMiddleware, superAdminMiddleware,saveCategory)

router.get("/:categoryId/subcategories/list",  authMiddleware, superAdminMiddleware, getSubCategory )

router.put("/:categoryId/subcategories/:id",  authMiddleware, superAdminMiddleware,updateSubCategory )

router.delete("/:categoryId/subcategories/delete-subcategory/:id", authMiddleware, superAdminMiddleware, deleteCategory)
module.exports = router;