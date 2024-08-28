const jwt = require("jsonwebtoken");
require('dotenv').config()

const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];
  console.log('ACCESS', accessToken)
  if (!accessToken)
    return res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });

  jwt.verify(accessToken, process.env.ACCESS_TOKKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        err: err,
        msg: "Access token expired",
      });
    }
    if (accessToken) {
      console.log('da xac thuc', user?.id);
    }
    req.user = user?.id;
    next();
  });
};

module.exports = verifyToken