const LeadTask = require("../models/LeadTask");


// ======================================================
// 📌 CREATE TASK
// ======================================================
exports.createTask = async (req, res) => {
  try {
    const { lead, title, description, dueDate, priority, addedBy } = req.body;

    const task = new LeadTask({
      lead,
      title,
      description,
      dueDate,
      priority,
      addedBy,
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ======================================================
// 📌 GET ALL TASKS FOR A LEAD
// ======================================================
exports.getTasksByLead = async (req, res) => {
  try {
    const tasks = await LeadTask.find({ lead: req.params.leadId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// ======================================================
// 📌 GET SINGLE TASK
// ======================================================
exports.getTaskById = async (req, res) => {
  try {
    const task = await LeadTask.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// ======================================================
// 📌 UPDATE TASK
// ======================================================
exports.updateTask = async (req, res) => {
  try {
    const updated = await LeadTask.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// ======================================================
// 📌 DELETE TASK
// ======================================================
exports.deleteTask = async (req, res) => {
  try {
    const removed = await LeadTask.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedId: removed._id,
    });

  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
