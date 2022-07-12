const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
const checkURL = require("./Middleware/checkURL");
const { authenticate } = require("./comman/login");
const { addUser } = require("./comman/register");
const { getalluser } = require("./comman/getUser");
const { verify } = require("jsonwebtoken");

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

app.listen(5000);
