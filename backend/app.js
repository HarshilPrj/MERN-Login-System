const express = require("express");
const app = express();
const DBconnect = require("./Database/database");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
require("dotenv").config();
const upload = require("./Middleware/uploadFile");
const checkURL = require("./Middleware/checkURL");
const verifyToken = require("./Middleware/verifyToken");
const { authenticate } = require("./comman/login");
const { addUser } = require("./comman/register");
const { getalluser } = require("./comman/getUser");

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(cookie());

app.get("/admin", (req, res) => {
  res.end("welcome To Admin");
});

app.post("/add_user", upload, async (req, res) => {
  addUser(req, res);
});

app.post("/login", checkURL, async (req, res) => {
  authenticate(req, res);
});

app.get("/login/user", verifyToken, (req, res) => {
  DBconnect.query("SELECT * FROM users WHERE user_name = ?", [req.user_name], (err, result) => {
    if (!result) {
      res.redirect('/login');
    } else {
      return res.json({ user: result });
    }
  });
});

app.get("/logout", async (req, res) => {
  res.redirect('/');
  return res
  .clearCookie("user_token")
  .status(200)
  .json({ Success: "Logged out" });
});

app.get("/users", async (req, res) => {
  getalluser(req, res);
});

app.listen(5000);
