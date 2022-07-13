const express = require("express");
const app = express();
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
const { uploadFile } = require("./comman/file");

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(cookie());

app.post("/add_user",upload, async (req, res) => {
  addUser(req, res);
});

app.post("/login", checkURL, async (req, res) => {
  authenticate(req, res);
});

app.get("/login/user", verifyToken, (req, res) => {
  return res.json({ user: { userName: req.user_name } });
});

app.get("/logout", verifyToken, async (req, res) => {
  return res
    .clearCookie("user_token")
    .status(200)
    .json({ Success: "Logged out" });
});

app.get("/home", async (req, res) => {
  getalluser(req, res);
});

app.post("/profile", upload, (req, res) => {
  uploadFile(req, res);
});

app.listen(5000);
