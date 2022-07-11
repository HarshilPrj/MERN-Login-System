const DBconnect = require("../Database/config ");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

module.exports = {
  async authenticate(req, res) {
    const user_name = req.body.user_name;
    const password = req.body.password;

    try {
      DBconnect.query("select * from users where user_name = ? ", [user_name], (err, user) => {
        if (user.length === 0) {
          res.send({ err: "UserName not found" });
        } else {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (result == true) {
              let userName = user[0].user_name;
              const token = jwt.sign({ userName }, JWT_SECRET, { expiresIn: "1 day" });
              res.send({ ...user, token });
            } else {
              res.send({ error: "Passwords does not match" });
            }
          });
        }
      });
    }
    catch (err) {
      res.send({ err: "User not found" })
    }
  }
}