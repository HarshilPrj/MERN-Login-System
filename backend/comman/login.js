const DBconnect = require("../Database/config ");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

module.exports = {
  async authenticate(req, res) {
    const user_name = req.body.user_name;
    const password = req.body.password;

    try {
      DBconnect.query(
        "select * from users where user_name = ?",
        [user_name],
        (err, results) => {
          bcrypt.compare(password, results[0].password, function (err, result) {
            if (result) {
              const user = results[0].user_name;

              const token = jwt.sign({ user }, JWT_SECRET, {
                expiresIn: "1 day",
              });

              res.send({ ...results, token });
            } else {
              return res
                .status(400)
                .json({
                  error: "please provide a valid user_name and password",
                });
            }
          });
        }
      );
    } catch (error) {
      res.status(500).send("some Error Occured");
    }
  },
};
