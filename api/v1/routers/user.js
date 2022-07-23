const express = require("express");
const router = express.Router();

// import validation file
const { validateRegister } = require("../validator/validate-register");
const { validateAuth } = require("../validator/validateAuth");

//importing user controllers
const userCtrl = require("../controllers/user/user");
const authCtrl = require("../controllers/user/auth");

router.get("/", (req, res) => res.send("user get - nested router"));

router.post("/", validateRegister, userCtrl);

router.post("/auth", validateAuth, authCtrl);

module.exports = router;
