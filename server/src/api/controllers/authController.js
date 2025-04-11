const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Helper: send OTP via email
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // Your Gmail ID
      pass: process.env.MAIL_PASS  // App password (not your normal password)
    }
  });

  await transporter.sendMail({
    from: `"Auth App" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: ${otp}</h2><p>It expires in 5 minutes.</p>`
  });
};

// POST /signup
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already has an account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /send-otp
// POST /send-otp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000); // 5 minutes

    user.otp = otp;
    user.otpExpires = expires;
    await user.save();

    try {
      await sendOTP(email, otp);
      res.json({ message: "OTP sent to email" });
    } catch (mailErr) {
      console.error("❌ Error sending OTP:", mailErr.message);
      res.status(500).json({ message: "Failed to send OTP. Check email configuration." });
    }

  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /verify-otp
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "OTP verified, login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
