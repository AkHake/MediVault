const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.put("/me", authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  const updated = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true }).select("-password");
  res.json(updated);
});

module.exports = router;
