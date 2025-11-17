const express = require("express");
const router = express.Router();
const {
  createCallSummary,
  getSummariesByLead,
  deleteCallSummary
} = require("../controllers/leadCallSummaryController");

// ➤ Create Call Summary
router.post("/", createCallSummary);

// ➤ Get Call Summaries for a specific lead
router.get("/:leadId", getSummariesByLead);

// ➤ Delete Call Summary
router.delete("/:id", deleteCallSummary);

module.exports = router;
