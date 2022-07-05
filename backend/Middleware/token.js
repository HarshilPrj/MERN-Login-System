const jwt = require("jsonwebtoken");
const token = require("../Database/server");

// module.exports = craeteToken = () => {
//   const token = jwt.sign({ user_name }, "loginuser");
//   console.log(token);
// };

const verifyToken = (req, res, next) => {
    console.log("working");
    req.headers.authorization.split('')[1];
    let checkToken = jwt.verify(token, "loginuser", (err, result) => {
        if (err) {
            res.status(401).send(err);
            console.log(err);
        } else {
            res.send(result);
            next();
        }
    });
    console.log(checkToken);
};

module.exports = verifyToken;
