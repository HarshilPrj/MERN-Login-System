const jwt = require("jsonwebtoken");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

const verifyToken = async (req, res, next) => {
  const token =  await req.header('token');
  console.log(token);
  if(!token){
    res.status(401).send({err:'invalid token'});
  }
  try {
   jwt.verify(token, JWT_SECRET, (error, data) => {
      if(error){
        return res.send({ message: 'Token is expired! please try again.' });
      }
    });
  } catch (error) {
   return res.status(401).send({
      error: error.message,
      stack: error.stack
    });
  }
  next()
};

module.exports = verifyToken;
