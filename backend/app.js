const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./Middleware/token");
const { authenticate } = require("./comman/login");
const { addUser } = require("./comman/register");

app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

app.post("/add_user", async (req, res) => {
  addUser(req, res);
});

app.post("/login",verifyToken, async (req, res) => {
  authenticate(req, res);
});

app.listen(5000);
