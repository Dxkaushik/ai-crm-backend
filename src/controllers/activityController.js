const Lead = require("../models/Lead");
const Booking = require("../models/Booking");

// Helper to format time ago
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return `${seconds} secs ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

// ===============================
// Recent Activities API
// ===============================
exports.getRecentActivities = async (req, res) => {
  try {
    // STEP 1: Fetch recent leads
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // STEP 2: Convert leads into activity items
    const leadActivities = leads.map((lead) => ({
      type: "lead",
      message: `New Lead Added - ${lead.fullName}`,
      timeAgo: timeAgo(lead.createdAt),
      createdAt: lead.createdAt
    }));

    // STEP 3: Fetch recent bookings
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("lead")
      .populate("project");

    // STEP 4: Convert bookings into readable activities
    const bookingActivities = bookings.map((booking) => ({
      type: "booking",
      message: `New Booking Created for ${booking?.lead?.fullName || "Unknown Lead"}`,
      timeAgo: timeAgo(booking.createdAt),
      createdAt: booking.createdAt
    }));

    // STEP 5: Merge + Sort All Activities
    const activities = [...leadActivities, ...bookingActivities]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 20); // return latest 20

    res.status(200).json({
      success: true,
      data: activities
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching activity logs",
      error: err.message
    });
  }
};
