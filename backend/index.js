// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/users", userRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
