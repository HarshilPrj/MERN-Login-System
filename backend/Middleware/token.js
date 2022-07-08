const jwt = require("jsonwebtoken");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";
const loginURL = "/loginn";

const verifyToken = async (req, res, next) => {
  const url = req.url;
  if (url === loginURL) {
    return next();
  } else {
    res.status(500).send({ 500: "Server error" });
  }

  // const token = req.headers.authorization;
  // if (!token) {
  //   res.status(401).send("Invalid token");
  // }
  // try {
  //   jwt.verify(token, JWT_SECRET, (error, data) => {

  //     if (error) {
  //       res.send({ error: error });
  //       console.log("token not verified");
  //     }

  //     if (data.user === req.body.user_name) {
  //       res.send({ success: "User successfully Login" });
  //     } else {
  //       res.status(404).send({ error: "User not found" });
  //     }
  //   });

  // } catch (error) {

  //   return res.status(401).send({
  //     error: error.message,
  //     stack: error.stack,
  //   });
  // }
  // next();
};

module.exports = verifyToken;
