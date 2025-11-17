const express = require("express");
const router = express.Router();
const leadMOMController = require("../controllers/leadMOMController");

// CREATE MOM
router.post("/", leadMOMController.createMOM);

// GET ALL MOM ENTRIES FOR A LEAD
router.get("/lead/:leadId", leadMOMController.getMOMsByLead);

// GET SINGLE MOM ENTRY
router.get("/:id", leadMOMController.getMOMById);

// UPDATE MOM
router.put("/:id", leadMOMController.updateMOM);

// DELETE MOM
router.delete("/:id", leadMOMController.deleteMOM);

module.exports = router;
