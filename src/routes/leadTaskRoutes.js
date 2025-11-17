const express = require("express");
const router = express.Router();
const leadTaskController = require("../controllers/leadTaskController");

// CREATE
router.post("/", leadTaskController.createTask);

// GET ALL TASKS FOR A LEAD
router.get("/lead/:leadId", leadTaskController.getTasksByLead);

// GET SINGLE TASK
router.get("/:id", leadTaskController.getTaskById);

// UPDATE
router.put("/:id", leadTaskController.updateTask);

// DELETE
router.delete("/:id", leadTaskController.deleteTask);

module.exports = router;
