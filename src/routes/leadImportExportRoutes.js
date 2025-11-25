const express = require("express");
const router = express.Router();
const leadImportExportController = require("../controllers/leadImportExportController");

router.get("/export/csv", leadImportExportController.exportCSV);
router.post("/import/csv", leadImportExportController.importCSV);

router.get("/export/excel", leadImportExportController.exportExcel);
router.post("/import/excel", leadImportExportController.importExcel);

module.exports = router;
