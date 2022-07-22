const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const saltRounds = 10;

module.exports = userCtrl = async (req, res) => {
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
    user = { ...user, password: "" };
    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60,
        data: user,
      },
      config.get("jwtSecret")
    );

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error!" });
  }
};
