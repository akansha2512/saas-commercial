// Express ke bina:
// route bana hi nahi sakte

const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {superAdminMiddleware} = require("../middleware/superAdminMiddleware");

const{getPendingStores, approveStore, rejectStore} = require("../controllers/adminController");
router.get("/pending-stores",authMiddleware,superAdminMiddleware,getPendingStores);
router.put("/approve-store/:id",authMiddleware,superAdminMiddleware,approveStore);
router.put("/reject-store/:id", authMiddleware, superAdminMiddleware, rejectStore);

module.exports = router;

