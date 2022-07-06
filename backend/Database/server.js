const DBconnect = require("./config ");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/token");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "Coodeitisbest$solutions$pvt$ltd";

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  let arr = [{
    title: "Welcome To DashBoard",
    skills: [
      'javascript', 'React', 'Node', 'Next'
    ]
  }]
  res.send(arr);
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
    DBconnect.query("select * from users where user_name = ?", [user_name], (err, results) => {

      bcrypt.compare(password, results[0].password, function (err, result) {

        if (result) {

          const data = {
            user: {
              username: results[0].user_name,
            }
          }
          console.log(">>>>>>", data.user.username);

          const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: "1 day" });
          return res.send({ ...results,token });

        } else {
          return res.status(400).json({ error: 'please provide a valid user_name and password' });
        }
      });
    });


  } catch (error) {
    console.error(error);
    res.status(500).send("some Error Occured");
  }
});

app.get("/getuser",verifyToken, (req, res) => {

  try {
    DBconnect.query('SELECT * FROM users',(err, result)=>{
      if (result) {
        res.send(result);
    }
  })
  } catch (err) {
    return res.send(err);
  }
});

app.get("/getuser/:username",verifyToken, (req, res) => {
  let username = req.params.username;
  try {
    DBconnect.query('SELECT * FROM users where user_name = ?', [username] ,(err, result)=>{
      if (result) {
        res.send(result);
    }
    return res.send('NO')
  })
  } catch (err) {
    return res.send(err);
  }
});

app.listen(5000);
