const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("🔥 Create user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, users });
};


exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ success: true, user });
};


exports.updateUser = async (req, res) => {
  const updates = req.body;
  delete updates.password;
  const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
  res.json({ success: true, message: "User updated", user: updated });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "User deleted" });
};