const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = Auth = (req, res, next) => {
  const token = req.header("auth-token");

  // check if no token
  if (!token)
    return res.status(401).json({ msg: "No token, Authorization denied!" });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // req.user = decoded.user;
    return res.json({ something: decoded });
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ msg: err.message });
  }
};
