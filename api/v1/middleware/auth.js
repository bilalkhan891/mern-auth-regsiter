const jwt = require("jsonwebtoken");
const config = require("config");

// const jwtSecret = config.get("jwtSecret");

module.exports = Auth = (req, res, next) => {
  const token = req.header("auth-token");

  // check if no token
  if (!token)
    return res.status(401).json({ msg: "No token, Authorization denied!" });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    if (err.message === "invalid token")
      return res.status(401).json({ msg: err.message });
    return res.status(401).json({ msg: "server error!" });
  }
};
