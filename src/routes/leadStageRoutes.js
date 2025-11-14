const express = require("express");
const router = express.Router();

const {
  createLeadStage,
  getAllLeadStages,
  getLeadStageById,
  updateLeadStage,
  deleteLeadStage
} = require("../controllers/leadStageController");

router.post("/", createLeadStage);
router.get("/", getAllLeadStages);
router.get("/:id", getLeadStageById);
router.put("/:id", updateLeadStage);
router.delete("/:id", deleteLeadStage);

module.exports = router;
