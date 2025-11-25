const Lead = require("../models/Lead");
const { Parser } = require("json2csv");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");


// =======================
// EXPORT TO CSV
// =======================
exports.exportCSV = async (req, res) => {
    try {
        const leads = await Lead.find().lean();

        if (!leads.length) {
            return res.status(400).json({ success: false, message: "No leads available to export" });
        }

        const fields = Object.keys(leads[0]);
        const parser = new Parser({ fields });
        const csvData = parser.parse(leads);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=leads.csv");

        return res.status(200).send(csvData);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




// =======================
// IMPORT FROM CSV
// =======================
exports.importCSV = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ success: false, message: "CSV file is required" });
        }

        const file = req.files.file;
        const results = [];
        const filePath = `uploads/${Date.now()}-${file.name}`;

        await file.mv(filePath);

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                row.leadScore = row.leadScore ? Number(row.leadScore) : 0;
                results.push(row);
            })
            .on("end", async () => {
                await Lead.insertMany(results);
                fs.unlinkSync(filePath);

                res.json({ success: true, message: "CSV imported successfully" });
            });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// =======================
// EXPORT TO EXCEL
// =======================
exports.exportExcel = async (req, res) => {
    try {
        const leads = await Lead.find().lean();

        if (leads.length === 0) {
            return res.status(400).json({ success: false, message: "No leads found" });
        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(leads);

        XLSX.utils.book_append_sheet(wb, ws, "Leads");

        const filePath = `uploads/leads-${Date.now()}.xlsx`;
        XLSX.writeFile(wb, filePath);

        res.download(filePath, () => fs.unlinkSync(filePath));

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// =======================
// IMPORT FROM EXCEL
// =======================
exports.importExcel = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ success: false, message: "Excel file is required" });
        }

        const file = req.files.file;
        const filePath = `uploads/${Date.now()}-${file.name}`;

        await file.mv(filePath);

        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        jsonData.forEach((row) => {
            row.leadScore = row.leadScore ? Number(row.leadScore) : 0;
        });

        await Lead.insertMany(jsonData);
        fs.unlinkSync(filePath);

        res.json({ success: true, message: "Excel imported successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
