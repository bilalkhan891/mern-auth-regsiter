const express = require("express");
const connectDB = require("./config/db");
// importing routes
const user = require("./api/v1/routers/user");
const profile = require("./api/v1/routers/profile");

const app = express();

// init db connection
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// User User Route
app.use("/api/v1/user", user);

// User User Route
app.use("/api/v1/profile", profile);

// Base route
app.get("/", (req, res) => {
  res.send("go to: /api/v1/<route-name>");
});

// Starting app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is started on: http://localhost:${PORT}`);
});
