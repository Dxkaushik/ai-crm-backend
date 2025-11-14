const LeadStage = require("../models/LeadStage");

// ➕ Create Lead Stage
exports.createLeadStage = async (req, res) => {
    try {
        const { name, description, color, order } = req.body;

        const stage = await LeadStage.create({
            name,
            description,
            color,
            order
        });

        res.status(201).json({
            success: true,
            message: "Lead stage created successfully",
            data: stage
        });
    } catch (error) {
        console.error("Error creating lead stage:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// 📄 Get All Lead Stages
exports.getAllLeadStages = async (req, res) => {
    try {
        const stages = await LeadStage.find().sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: stages.length,
            data: stages
        });
    } catch (error) {
        console.error("Error fetching lead stages:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// 📌 Get Single Lead Stage
exports.getLeadStageById = async (req, res) => {
    try {
        const stage = await LeadStage.findById(req.params.id);

        if (!stage) {
            return res.status(404).json({
                success: false,
                message: "Lead stage not found"
            });
        }

        res.status(200).json({ success: true, data: stage });
    } catch (error) {
        console.error("Error fetching lead stage:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

// ✏️ Update Lead Stage
exports.updateLeadStage = async (req, res) => {
    try {
        const stage = await LeadStage.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!stage) {
            return res.status(404).json({
                success: false,
                message: "Lead stage not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead stage updated successfully",
            data: stage
        });
    } catch (error) {
        console.error("Error updating lead stage:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};


exports.deleteLeadStage = async (req, res) => {
    try {
        const stage = await LeadStage.findByIdAndDelete(req.params.id);

        if (!stage) {
            return res.status(404).json({
                success: false,
                message: "Lead stage not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead stage deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting lead stage:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
