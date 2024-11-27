// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const userRoutes = require("./routes/users");
const quotesRoutes = require("./routes/quotes");

const app = express();
app.use(cors());
app.use(express.json());

//make public folder
app.use("/uploads", express.static("uploads"));

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// Initialize Multer with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
    }
  },
});

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/users", userRoutes);
app.use("/api/quotes", quotesRoutes);

// Endpoint to upload multiple images
app.post("/api/upload", upload.array("pictures", 5), (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const filePaths = files.map((file) => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
    }));

    res.json({
      message: "Files uploaded successfully",
      files: filePaths,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
