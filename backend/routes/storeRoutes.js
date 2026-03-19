const express = require("express");
const router = express.Router();

const{authMiddleware} = require("../middleware/authMiddleware");
const {createStore, getStore} = require("../controllers/StoreController");

router.post("/create-stores", authMiddleware, createStore);
router.get("/get-stores", authMiddleware, getStore);
module.exports = router;