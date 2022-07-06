const jwt = require("jsonwebtoken");
const localStorage = require("local-storage");

const verifyToken = (req, res, next) => {
  console.log("working");
  let GetToken = localStorage.get('token');
  console.log(GetToken);
};

module.exports = verifyToken;
