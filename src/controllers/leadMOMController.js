const LeadMOM = require("../models/LeadMOM");


// ======================================================
// 📌 CREATE MOM ENTRY
// ======================================================
exports.createMOM = async (req, res) => {
  try {
    const {
      lead,
      meetingDateTime,
      attendees,
      agenda,
      discussion,
      actionItems,
      addedBy
    } = req.body;

    const mom = new LeadMOM({
      lead,
      meetingDateTime,
      attendees,
      agenda,
      discussion,
      actionItems,
      addedBy
    });

    await mom.save();

    res.status(201).json({
      success: true,
      message: "MOM created successfully",
      data: mom
    });
  } catch (error) {
    console.error("Error creating MOM:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ======================================================
// 📌 GET ALL MOM ENTRIES FOR A LEAD
// ======================================================
exports.getMOMsByLead = async (req, res) => {
  try {
    const moms = await LeadMOM.find({ lead: req.params.leadId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: moms.length,
      data: moms
    });
  } catch (error) {
    console.error("Error fetching MOM list:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ======================================================
// 📌 GET SINGLE MOM
// ======================================================
exports.getMOMById = async (req, res) => {
  try {
    const mom = await LeadMOM.findById(req.params.id);

    if (!mom) {
      return res.status(404).json({
        success: false,
        message: "MOM entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: mom
    });
  } catch (error) {
    console.error("Error fetching MOM:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ======================================================
// 📌 UPDATE MOM
// ======================================================
exports.updateMOM = async (req, res) => {
  try {
    const updated = await LeadMOM.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "MOM entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "MOM updated successfully",
      data: updated
    });

  } catch (error) {
    console.error("Error updating MOM:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ======================================================
// 📌 DELETE MOM
// ======================================================
exports.deleteMOM = async (req, res) => {
  try {
    const deleted = await LeadMOM.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "MOM entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "MOM deleted successfully",
      deletedId: deleted._id,
    });
  } catch (error) {
    console.error("Error deleting MOM:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
