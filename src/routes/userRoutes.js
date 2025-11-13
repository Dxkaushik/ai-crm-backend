const express = require("express");
const router = express.Router();
const { createUser, getAllUsers } = require("../controllers/userController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.post("/create", protect, restrictTo("Admin", "Director", "Manager"), createUser);
router.get("/", protect, restrictTo("Admin", "Director", "Manager"), getAllUsers);

module.exports = router;
