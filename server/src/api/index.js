const express = require("express");
const router = express.Router();

const authRoutes = require("./routes/authRoutes"); // ✅ must match file location

router.use("/auth", authRoutes);

module.exports = router;
