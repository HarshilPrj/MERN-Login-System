const DBconnect = require("./config ");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/token");
const bcrypt = require("bcryptjs");
const localStorage = require("local-storage");
const JWT_SECRET = 'Coodeitisbest$solutions$pvt$ltd'

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.send("Welcome TO DashBord");
});

app.post("/add_user", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(req.body.password, salt);

  const user_name = req.body.user_name;
  const password = secPass;
  const no = req.body.no;

  let sql = "insert into users (user_name, password, no) values ?";
  let values = [[user_name, password, no]];

  DBconnect.query(sql, [values], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post("/login", async (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;


  const token = jwt.sign({ user_name }, JWT_SECRET, {
    expiresIn: "10 minute",
  });
  console.log(token);

  localStorage.set("token", token);
  let get = localStorage.get("token");
  console.log("GET: ", get);

  DBconnect.query(
    "select * from users where user_name = ? AND password = ? ",
    [user_name, password],
    (err, result) => {
      if (err) {
        return res.send({ err: err });
      } else if (result.length > 0) {
        return res.send({ ...result, token });
      } else {
        return res
          .status(404)
          .send({ message: "Wrong user name and password" });
      }
    }
  );
});

app.listen(5000);
