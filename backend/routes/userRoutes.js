const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const {superAdminMiddleware} = require("../middleware/superAdminMiddleware");
const {getUser, updateUserStatus} = require("../controllers/userController");

router.get("/list-user", authMiddleware, superAdminMiddleware, getUser);
router.put("/update/:id", authMiddleware, superAdminMiddleware, updateUserStatus)
module.exports = router;
