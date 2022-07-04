const TokenGenerate = require("../Database/server/TokenGenerate");
const jwt = require("jsonwebtoken");

console.log(TokenGenerate);

const verifyToken = (req, res, next) => {
  const verify = jwt.verify(token, "login user");
  console.log(verify);
  next();
};

module.exports = verifyToken;
