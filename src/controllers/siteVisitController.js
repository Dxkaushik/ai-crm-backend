const SiteVisit = require("../models/SiteVisit");

// Create Site Visit
exports.createSiteVisit = async (req, res) => {
    try {
        const visit = await SiteVisit.create(req.body);
        res.status(201).json({ success: true, data: visit });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get All Site Visits
exports.getSiteVisits = async (req, res) => {
    try {
        const visits = await SiteVisit.find()
            .populate("lead")
            .populate("manager");

        res.status(200).json({ success: true, data: visits });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Site Visit
exports.getSiteVisit = async (req, res) => {
    try {
        const visit = await SiteVisit.findById(req.params.id)
            .populate("lead")
            .populate("manager");

        if (!visit) {
            return res.status(404).json({ success: false, message: "Site visit not found" });
        }

        res.status(200).json({ success: true, data: visit });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Site Visit
exports.updateSiteVisit = async (req, res) => {
    try {
        const visit = await SiteVisit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .populate("lead")
        .populate("manager");

        if (!visit) {
            return res.status(404).json({ success: false, message: "Site visit not found" });
        }

        res.status(200).json({ success: true, data: visit });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Site Visit
exports.deleteSiteVisit = async (req, res) => {
    try {
        const visit = await SiteVisit.findByIdAndDelete(req.params.id);

        if (!visit) {
            return res.status(404).json({ success: false, message: "Site visit not found" });
        }

        res.status(200).json({ success: true, message: "Site visit deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
