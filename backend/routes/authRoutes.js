const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("crypto");

const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   //   const { name, email, password } = req.body;
//   try {
//     const { name, email, password } = req.body;
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });
//     user = new User({ name, email, password });
//     await user.save();
//     res.json({ msg: "Registration successful" });
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please fill all fields" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    res.json({ msg: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "2h",
//     });
//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

// Login existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

const authMiddleware = require("../middleware/authMiddleware");

// Token validation route
router.get("/validate", authMiddleware, (req, res) => {
  res.json({ msg: "Token valid" });
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "No account with that email" });

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  console.log(`🔗 Reset Link: http://localhost:3000/reset-password/${token}`);
  res.json({ msg: "Password reset link sent (check console for simulation)" });
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ msg: "Password reset successful" });
});


module.exports = router;
