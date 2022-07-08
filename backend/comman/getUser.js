const DBconnect = require("../Database/config ");

module.exports = {
  async getalluser(req, res) {
    let sql = "SELECT * FROM users";

    DBconnect.query(sql, (err, data) => {
      res.send({ data });
    });
  },
};
