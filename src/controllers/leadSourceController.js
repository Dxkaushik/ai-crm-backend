const LeadSource = require('../models/LeadSource');
exports.createLeadSource = async (req, res) => {
    try {
        const { name, description, active } = req.body;

        const leadSource = new LeadSource({
            name,
            description,
            active
        });

        await leadSource.save();

        res.status(201).json({
            success: true,
            message: "Lead source created successfully",
            data: leadSource
        });
    } catch (error) {
        console.error("Error creating lead source:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

exports.getAllLeadSources = async (req, res) => {
    try {
        const sources = await LeadSource.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: sources.length,
            data: sources
        });
    } catch (error) {
        console.error("Error fetching lead sources:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

exports.getLeadSourceById = async (req, res) => {
    try {
        const source = await LeadSource.findById(req.params.id);

        if (!source) {
            return res.status(404).json({
                success: false,
                message: "Lead source not found"
            });
        }

        res.status(200).json({
            success: true,
            data: source
        });
    } catch (error) {
        console.error("Error fetching lead source:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

exports.updateLeadSource = async (req, res) => {
    try {
        const updatedSource = await LeadSource.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedSource) {
            return res.status(404).json({
                success: false,
                message: "Lead source not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead source updated successfully",
            data: updatedSource
        });
    } catch (error) {
        console.error("Error updating lead source:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

exports.deleteLeadSource = async (req, res) => {
    try {
        const deletedSource = await LeadSource.findByIdAndDelete(req.params.id);

        if (!deletedSource) {
            return res.status(404).json({
                success: false,
                message: "Lead source not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead source deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting lead source:", error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
