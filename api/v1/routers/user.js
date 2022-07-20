const express = require("express");
const router = express.Router();
const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const saltRounds = 10;

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user already exists
    let user = await User.findOne({ email: req.body.email });

    // return response if user already exists
    if (user) {
      return res
        .status(401)
        .json({ msg: "User already exists!", type: "Danger" });
    }

    user = {
      name: name,
      email: email,
      password: bcrypt.hashSync(password, saltRounds),
    };

    user = await User.create(user);
    delete user.password;

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
        data: user,
      },
      config.get("jwtSecret")
    );

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error!" });
  }
});

router.post("/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    const isPwdCorrect =
      user && (await bcrypt.compare(password, user?.password));

    // checking input details with db records
    if (!user || !isPwdCorrect)
      return res.status(404).json({ msg: "Wrong email or password!" });

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
        data: user,
      },
      config.get("jwtSecret")
    );

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error!" });
  }
});

module.exports = router;
