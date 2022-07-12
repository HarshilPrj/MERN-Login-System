const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
const checkURL = require("./Middleware/checkURL");
const verifyToken = require("./Middleware/verifyToken");
const { authenticate } = require("./comman/login");
const { addUser } = require("./comman/register");
const { getalluser } = require("./comman/getUser");

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(cookie());

app.post("/add_user", async (req, res) => {
  addUser(req, res);
});

app.post("/login", checkURL, async (req, res) => {
  authenticate(req, res);
});

app.get("/home", async (req, res) => {
  getalluser(req, res);
});

app.get("/logout", verifyToken, async (req, res) => {
  return res
  .clearCookie("user_token")
  .status(200)
  .json({ msg: "Logged out" });
});

app.listen(5000);
