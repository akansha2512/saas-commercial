const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {superAdminMiddleware} = require("../middleware/superAdminMiddleware");
const {getMerchant, updateMerchantStatus} = require("../controllers/merchantController");

router.get("/list-merchant", authMiddleware, superAdminMiddleware, getMerchant)
router.put("/update/:id",authMiddleware,superAdminMiddleware,updateMerchantStatus);
module.exports = router;