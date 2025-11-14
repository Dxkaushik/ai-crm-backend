const express = require("express");
const router = express.Router();

const {
  createLeadStatus,
  getLeadStatuses,
  getLeadStatus,
  updateLeadStatus,
  deleteLeadStatus
} = require("../controllers/leadStatusController");


router.post("/", createLeadStatus);

router.get("/", getLeadStatuses);


router.get("/:id", getLeadStatus);


router.put("/:id", updateLeadStatus);


router.delete("/:id", deleteLeadStatus);

module.exports = router;
