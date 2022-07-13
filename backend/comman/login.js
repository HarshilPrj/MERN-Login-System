const DBconnect = require("../Database/config ");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  async authenticate(req, res) {
    const user_name = req.body.user_name;
    const password = req.body.password;

    try {
      DBconnect.query("select * from users where user_name = ? ", [user_name], (err, user) => {
        if (user.length === 0) {
          return res.send({ Error: "UserName not found" });
        } else {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (result == true) {
              let userName = user[0].user_name;
              const token = jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: "1 day" });
              res
                .cookie("user_token", token, {
                  expires: new Date(Date.now() + 180000),
                  httpOnly: true
                })
                .status(200)
                .json({ message: "Logged in successfully", token });
              // .send({ ...user, token });
            } else {
              return res.send({ Error: "Passwords does not match" });
            }
          });
        }
      });
    }
    catch (err) {
      res.send({ Error: "User not found" });
    }
  }
}