const Booking = require("../models/Booking");

// ==========================================
// Create Booking
// ==========================================
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message
    });
  }
};

// ==========================================
// Get All Bookings
// ==========================================
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("lead")
      .populate("source")
      .populate("project");

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message
    });
  }
};

// ==========================================
// Get Single Booking
// ==========================================
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("lead")
      .populate("source")
      .populate("project");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message
    });
  }
};

// ==========================================
// Update Booking
// ==========================================
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: error.message
    });
  }
};

// ==========================================
// Delete Booking
// ==========================================
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: error.message
    });
  }
};

// ==========================================
// Get Bookings WITH Lead ID
// ==========================================
exports.getBookingsWithLead = async (req, res) => {
  try {
    const bookings = await Booking.find({ lead: { $ne: null } })
      .populate("lead")
      .populate("source")
      .populate("project");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings with lead",
      error: error.message
    });
  }
};

// ==========================================
// Get Bookings WITHOUT Lead ID
// ==========================================
exports.getBookingsWithoutLead = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ lead: null }, { lead: { $exists: false } }]
    })
      .populate("source")
      .populate("project");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings without lead",
      error: error.message
    });
  }
};


// ==========================================
// Get Total Revenue
// ==========================================
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$bookingAmount" }
        }
      }
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating total revenue",
      error: error.message
    });
  }
};


// ==========================================
// Revenue Overview (Monthly Revenue by Status)
// ==========================================
exports.getRevenueOverview = async (req, res) => {
  try {
    const revenue = await Booking.aggregate([
      {
        $group: {
          _id: {
            status: "$status", 
            month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }
          },
          totalRevenue: { $sum: "$bookingAmount" }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);

    // Format output grouped by status
    const formatted = {};

    revenue.forEach(item => {
      const status = item._id.status || "Unknown";
      const month = item._id.month;

      if (!formatted[status]) {
        formatted[status] = [];
      }

      formatted[status].push({
        month,
        totalRevenue: item.totalRevenue
      });
    });

    res.status(200).json({
      success: true,
      data: formatted
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching revenue overview",
      error: error.message
    });
  }
};

