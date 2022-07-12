const DBconnect = require("../Database/config ");
const bcrypt = require("bcryptjs");

module.exports = {
  async addUser(req, res) {
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    const user_name = req.body.user_name;
    const password = secPass;
    const no = req.body.no;

    let sql = "insert into users (user_name, password, no) values ?";
    let values = [[user_name, password, no]];

    DBconnect.query(sql, [values], (error, result) => {
      if (error) {
        res.send({ error: "User Already Exist. Try To Different UserName" });
      }
    });
  },
};
