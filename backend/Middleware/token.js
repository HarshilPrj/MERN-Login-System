const jwt = require("jsonwebtoken");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

const verifyToken = async (req, res, next) => {
  const token = await req.headers.authorization;
  console.log(token);
  if (!token) {
    res.status(401).send({ err: "invalid token" });
  }
  try {
    console.log(">>>>>", token);
    jwt.verify(token, JWT_SECRET, (error, data) => {
      // console.log(data);
      // console.log("This is token >>>>>", data.user);
      // if (req.body.user_name === data.user) {
      //   console.log("login successfull");
      //   res.send("login successfull");
      // } else {
      //   res.send("login failed");
      // }
    });
  } catch (error) {
    return res.status(401).send({
      error: error.message,
      stack: error.stack,
    });
  }
  next();
};

module.exports = verifyToken;
