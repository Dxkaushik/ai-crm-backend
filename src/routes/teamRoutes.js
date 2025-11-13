const express = require("express");
const router = express.Router();

const {
  createTeam,
  updateTeam,
  deleteTeam,
  getAllTeams,
} = require("../controllers/teamController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

router.post("/create", protect, restrictTo("Admin", "Director", "Manager"), createTeam);
router.put("/update/:id", protect, restrictTo("Admin", "Director", "Manager"), updateTeam);
router.delete("/delete/:id", protect, restrictTo("Admin", "Director", "Manager"), deleteTeam);
router.get("/", protect, getAllTeams);

module.exports = router;
