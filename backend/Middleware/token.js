const jwt = require("jsonwebtoken");

// const TokenGenerate = () => {
//     const token = jwt.sign({ }, "loginuser");
//     return token;
// };

const verifyToken = (req, res, next) => {
    const verify = jwt.verify(token, "loginuser");
    console.log(verify);
    next();
};

// module.exports = { TokenGenerate, verifyToken };
