const app = require('./app');
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB first
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(port, () => {
    console.log(`🚀 Server listening at: http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
