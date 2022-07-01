const DBconnect = require("./config ");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.post("/add_user", (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;
  const no = req.body.no;

  const token = jwt.sign({ password }, "loginsystem");
  console.log(token);

  DBconnect.query(
    "insert into users (user_name, password, no) values (?, ?, ?) ",
    [user_name, password, no],
    (err, val) => {
      if (err) {
        res.send(err);
      } else {
        res.send(val);
      }
    });
});

app.post("/login", (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;

  DBconnect.query(
    "select * from users where user_name = ? AND password = ? ",
    [user_name, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong user name and password" });
      }
    }
  );
});

app.listen(5000);
