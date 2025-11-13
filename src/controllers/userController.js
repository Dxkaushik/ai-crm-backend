const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, teamId } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Optional: validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "Sales",
      team: teamId || null,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        team: newUser.team,
      },
    });
  } catch (error) {
    console.error("🔥 Create user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("team", "name");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("🔥 Get users error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
