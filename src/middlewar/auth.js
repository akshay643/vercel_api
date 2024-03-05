const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //	return next();
  const token =
    req.headers["authorization"] ||
    req.headers["Access_Token"] ||
    req.headers["access_token"] ||
    req.headers["Access_token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    verifiedToken = verified;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;
