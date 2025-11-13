const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); 
const teamRoutes = require("./routes/teamRoutes");
const projectRoutes = require('./routes/projectRoutes');
const channelPartnerQueryRoutes = require('./routes/channelPartnerQueryRoutes');
const companyRoutes = require('./routes/companyRoutes');

dotenv.config({ path: './.env' });

const app = express();

app.use(cors({
  origin: [
    "https://advancedcrms.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


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
app.use('/api/projects', projectRoutes);
app.use('/api/channel-partner-queries', channelPartnerQueryRoutes);
app.use('/api/companies', companyRoutes);


app.get("/test", (req, res) => {
  res.json({ message: "Working!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
