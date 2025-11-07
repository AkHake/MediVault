// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Import routes
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

// Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/records", require("./routes/recordRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use("/api/user", require("./routes/userRoutes"));
