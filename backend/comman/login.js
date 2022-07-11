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
        if (err) {
          res.send({ err: "UserName does not match" })
        }
        // check password
        bcrypt.compare(password, user[0].password, function (err, result) {
          if (result == true) {
            const token = jwt.sign({ user_name }, JWT_SECRET, { expiresIn: "1 day" });
            res.send({ ...user, token });
          } else {
            res.send({ error: "Passwords does not match" });
          }
        });
      });
    } catch (err) {
      res.send({ err: "User not found" })
    }
  },
};
