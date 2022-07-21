const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
// importing routes
const api = require("./api");

const app = express();

// init db connection
connectDB();

// API users
app.use("/api", api);

// Starting app
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is started on: http://localhost:${PORT}`);
});
