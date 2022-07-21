const express = require("express");
const router = express.Router();

//importing user controllers
const userCtrl = require("../controllers/user/user");
const authCtrl = require("../controllers/user/auth");

router.get("/", (req, res) => res.send("user get - nested router"));

router.post("/", userCtrl);

router.post("/auth", authCtrl);

module.exports = router;
