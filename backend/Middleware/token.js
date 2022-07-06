const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("working");
  let GetToken = localStorage.getItem('token');
  console.log(GetToken);
};

module.exports = verifyToken;
