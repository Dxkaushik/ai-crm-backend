const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  getLeadTrendStats
} = require("../controllers/leadController");

router.get("/stats/trend", getLeadTrendStats);
router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
