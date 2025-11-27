const express = require("express");
const router = express.Router();

const {
  assignLead,
  getAllAssignments,
  getMyAssignedLeads
} = require("../controllers/assignedLeadController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Managers/Admin assign leads
router.post("/assign", protect, restrictTo("Admin", "Director", "Manager"), assignLead);

// Admin/Manager view all assignments
router.get("/", protect, restrictTo("Admin", "Director", "Manager"), getAllAssignments);

// Sales person view only assigned to them
router.get("/my", protect, getMyAssignedLeads);

module.exports = router;
