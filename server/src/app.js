const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./api");

require("dotenv").config();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.use("/api", routes); // your api routes

module.exports = app; // ✅ important!
