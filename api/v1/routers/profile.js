const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");

router.get("/", Auth, (req, res) => {
  res.json({ msg: "Authorized" });
});

module.exports = router;
