const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const saltRounds = 10;

module.exports = authCtrl = async (req, res) => {
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
};
