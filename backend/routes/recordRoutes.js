const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Record = require("../models/Record");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });

// // Storage setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "uploads";
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// Storage configuration
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// Configure Multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// // Upload Record
// router.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ msg: "File uploaded successfully", file: req.file });
// });

// Upload record (with MongoDB save)
// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const newRecord = new Record({
//       userId: req.body.userId || "6748f45f3", // temporary static for demo
//       // userId: req.body.userId || null, // optional for now
//       fileName: req.file.filename,
//       filePath: req.file.path,
//     });
//     await newRecord.save();
//     res.json({ message: "File uploaded and saved to DB", record: newRecord });
//   } catch (err) {
//     console.error("Upload error:", err);
//     return res.status(500).json({ message: "Server error: " + err.message });
//     // res.status(500).json({ message: "Error uploading file" });
//   }
// });

// Upload file (protected)
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const newRecord = new Record({
      userId: req.user.id,  // Automatically taken from JWT
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    await newRecord.save();
    res.json({ msg: "File uploaded successfully", record: newRecord });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ msg: "Error uploading file" });
  }
});

// Fetch user’s records (protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching records" });
  }
});

// // View Records (dummy for now)
// router.get("/", (req, res) => {
//   res.json([{ name: "Report1.pdf", date: "2025-11-05" }]);
// });

// Fetch user records
// router.get("/:userId", async (req, res) => {
//   try {
//     const records = await Record.find({ userId: req.params.userId });
//     res.json(records);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching records" });
//   }
// });


// // Protect these
// router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
//   const newRecord = new Record({
//     userId: req.user.id,  // logged-in user's ID from token
//     fileName: req.file.filename,
//     filePath: req.file.path,
//   });
//   await newRecord.save();
//   res.json({ message: "✅ File uploaded & saved", record: newRecord });
// });

// router.get("/", authMiddleware, async (req, res) => {
//   const records = await Record.find({ userId: req.user.id });
//   res.json(records);
// });


module.exports = router;
