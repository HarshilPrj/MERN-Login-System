const DBconnect = require("./config ");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/token");
const bcrypt = require("bcryptjs");
const localStorage = require("local-storage");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

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

  try {
    DBconnect.query(
      "select * from users where user_name = ?",
      [user_name],
      (err, results) => {
        bcrypt.compare(password, results[0].password, function (err, result) {
          console.log(">>>>>>", password);
          console.log(">>>>>>", results[0].password);
          if (result) {
            const token = jwt.sign({ user_name }, JWT_SECRET, { expiresIn: "10 minute" });
            return res.send({ ...results, token });
          } else {
            return res.status(400).send();
          }
        });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).send("some Error Occured");
  }
});

app.listen(5000);
