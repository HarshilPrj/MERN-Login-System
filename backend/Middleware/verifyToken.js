const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.user_token;
  if (!token) {
    res.status(401).send({ Error: "Invalid token" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
      req.user_name = data.userName;
      return next();
    });
  } catch (error) {
    return res.status(401).send({
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = verifyToken;
