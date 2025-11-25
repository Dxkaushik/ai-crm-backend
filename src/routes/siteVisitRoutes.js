const express = require("express");
const router = express.Router();
const siteVisitController = require("../controllers/siteVisitController");

// Create Site Visit
router.post("/", siteVisitController.createSiteVisit);

// Get All Site Visits
router.get("/", siteVisitController.getSiteVisits);

// Get Single Site Visit
router.get("/:id", siteVisitController.getSiteVisit);

// Update Site Visit
router.put("/:id", siteVisitController.updateSiteVisit);

// Delete Site Visit
router.delete("/:id", siteVisitController.deleteSiteVisit);

module.exports = router;
