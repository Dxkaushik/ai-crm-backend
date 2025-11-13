const Team = require("../models/Team");

// ✅ Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Team name is required" });
    }

    const existingTeam = await Team.findOne({ name: name.trim() });
    if (existingTeam) {
      return res.status(400).json({ success: false, message: "Team name already exists" });
    }

    const newTeam = await Team.create({
      name: name.trim(),
      description: description || "",
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      team: newTeam,
    });
  } catch (error) {
    console.error("🔥 Create team error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update team
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ success: false, message: "Team not found" });

    if (name && name.trim() !== team.name) {
      const existingTeam = await Team.findOne({ name: name.trim() });
      if (existingTeam && existingTeam._id.toString() !== id.toString()) {
        return res.status(400).json({ success: false, message: "Team name already exists" });
      }
      team.name = name.trim();
    }

    if (description !== undefined) team.description = description;

    const updatedTeam = await team.save();

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("🔥 Update team error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ success: false, message: "Team not found" });

    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    console.error("🔥 Delete team error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("createdBy", "name email role");
    res.status(200).json({
      success: true,
      message: "Teams fetched successfully",
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.error("🔥 Get all teams error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
