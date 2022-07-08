const DBconnect = require("../Database/config ");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

module.exports = {
  async authenticate(req, res) {
    const user_name = req.body.user_name;
    const password = req.body.password;


    try {
      let user = DBconnect.query("select * from users where user_name = ?", [user_name, password]);
      if (user) {
        const email = user.values[0];
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1 day" });
        bcrypt.compare(password, user.values[1], function (err, result) {
          console.log(result);
          if (result) {
            res.send({ ...result, token });
          }
        });
      }
    } catch (e) {
      console.log("Not Found")
    }
  }
}
