const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;
