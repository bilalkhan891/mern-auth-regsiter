const express = require("express");
const router = express.Router();
const user = require("./v1/routers/user");
const profile = require("./v1/routers/profile");

router.use(express.json({ extended: true }));

router.get("/", (req, res) => {
  res.send("something");
});

router.use("/v1/user", user);
router.use("/v1/profile", profile);

module.exports = router;
