const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const projectRoutes = require("./routes/projectRoutes");
const channelPartnerQueryRoutes = require("./routes/channelPartnerQueryRoutes");
const companyRoutes = require("./routes/companyRoutes");
const leadSourceRoutes = require("./routes/leadSourceRoutes");
const leadStageRoutes = require("./routes/leadStageRoutes");
const leadStatusRoutes = require("./routes/leadStatusRoutes");
const leadRoutes = require("./routes/leadRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const amenityRoutes = require("./routes/amenityRoutes");
const leadNotesRoutes = require("./routes/leadNotesRoutes");
const leadCallSummaryRoutes = require("./routes/leadCallSummaryRoutes");
const leadTaskRoutes = require("./routes/leadTaskRoutes");
const leadMOMRoutes = require("./routes/leadMOMRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config({ path: "./.env" });
const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/channel-partner-queries", channelPartnerQueryRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/lead-sources", leadSourceRoutes);
app.use("/api/lead-stages", leadStageRoutes);
app.use("/api/lead-status", leadStatusRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/lead-notes", leadNotesRoutes);
app.use("/api/lead-call-summary", leadCallSummaryRoutes);
app.use("/api/lead-tasks", leadTaskRoutes);
app.use("/api/lead-mom", leadMOMRoutes);
app.use("/api/bookings", bookingRoutes);

// ✅ Simple test
app.get("/test", (req, res) => {
  res.json({ message: "✅ Working!" });
});

// ✅ Error handling
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({ message: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
