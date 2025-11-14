const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead
} = require("../controllers/leadController");


router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;
