const DBconnect = require("./config ");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/token");

// const route = express.Router();

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
// route.use(token);

app.post("/add_user", (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;
  const no = req.body.no;

  DBconnect.query(
    "insert into users (user_name, password, no) values (?, ?, ?) ",
    [user_name, password, no],
    (err, val) => {
      if (err) {
        res.send(err);
      } else {
        res.send(val);
      }
    }
  );
});

app.post("/login", verifyToken, (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;

  const token = jwt.sign({ user_name }, "loginuser");
  console.log(token);

  DBconnect.query(
    "select * from users where user_name = ? AND password = ? ",
    [user_name, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({ message: "Wrong user name and password" });
      }
    }
  );
});

app.listen(5000);
