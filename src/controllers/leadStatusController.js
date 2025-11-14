const LeadStatus = require("../models/LeadStatus");


exports.createLeadStatus = async (req, res) => {
    try {
        const leadStatus = await LeadStatus.create(req.body);
        res.status(201).json({ success: true, data: leadStatus });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getLeadStatuses = async (req, res) => {
    try {
        const statuses = await LeadStatus.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: statuses });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.getLeadStatus = async (req, res) => {
    try {
        const status = await LeadStatus.findById(req.params.id);
        if (!status) return res.status(404).json({ success: false, error: "Lead status not found" });

        res.status(200).json({ success: true, data: status });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.updateLeadStatus = async (req, res) => {
    try {
        const status = await LeadStatus.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!status) return res.status(404).json({ success: false, error: "Lead status not found" });

        res.status(200).json({ success: true, data: status });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteLeadStatus = async (req, res) => {
    try {
        const status = await LeadStatus.findByIdAndDelete(req.params.id);
        if (!status) return res.status(404).json({ success: false, error: "Lead status not found" });

        res.status(200).json({ success: true, message: "Lead status deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
