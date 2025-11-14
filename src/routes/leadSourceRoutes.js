const express = require("express");
const router = express.Router();

const {
    createLeadSource,
    getAllLeadSources,
    getLeadSourceById,
    updateLeadSource,
    deleteLeadSource
} = require("../controllers/leadSourceController");

router.post("/", createLeadSource);
router.get("/", getAllLeadSources);
router.get("/:id", getLeadSourceById);
router.put("/:id", updateLeadSource);
router.delete("/:id", deleteLeadSource);

module.exports = router;
