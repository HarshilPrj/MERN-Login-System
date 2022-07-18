const DBconnect = require("../Database/database");
const bcrypt = require("bcryptjs");

module.exports = {
  async addUser(req, res) {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);     

    const user_name = req.body.user_name;
    const password = secPass;
    const no = req.body.no;
    const photo = req.file.path;

    let sql = "insert into users (user_name, password, no, fileName) values ?";
    let values = [[user_name, password, no, photo]];

    DBconnect.query(sql, [values], (error, result) => {
      if (error) {
        // console.log(error);
        res.send({ error: "User Already Exist. Try To Different UserName" });
      }else{
        res.send({ success: "user added successfully." });
      }
    });
  },
};
