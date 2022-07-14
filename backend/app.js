const express = require("express");
const app = express();
const DBconnect = require("./Database/database");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-google-oauth20");
const upload = require("./Middleware/uploadFile");
const checkURL = require("./Middleware/checkURL");
const verifyToken = require("./Middleware/verifyToken");
const { authenticate } = require("./comman/login");
const { addUser } = require("./comman/register");
const { getalluser } = require("./comman/getUser");

app.use(
  session({
    secret: "this_is_a_secret",
    resave: true,
    saveUninitialized: true,
    rolling: true, // forces resetting of max age
    cookie: {
      maxAge: 360000,
      secure: false // this should be true only when you don't want to show it for security reason
    }
  })
);
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(cookie());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use(new Strategy({
  clientID: process.env.client_id,
  clientSecret: process.env.client_secret,
  callbackURL: `http://localhost:5000/auth/callback`,
},
  async (token, refreshToken, profile, done) => {
    done(null, profile);
  }
));

app.get("/", (req, res) => {

  res.end('welcome to the session demo. refresh!')

});

app.post("/add_user", upload, async (req, res) => {
  addUser(req, res);
});

app.post("/login", checkURL, async (req, res) => {
  authenticate(req, res);
});

app.get("/login/user", verifyToken, (req, res) => {
  DBconnect.query(
    "SELECT * FROM users WHERE user_name = ?",
    [req.user_name],
    (err, result) => {
      return res.json({ user: result });
    }
  );
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

app.get("/auth/google", passport.authenticate('google', { scope: ['profile'] }));

app.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/auth/fail' }), (req, res, next) => {
  console.log(req.user, req.isAuthenticated());
  res.send("user login successfully")
});

app.get("/auth/fail", (req, res, next) => {
  res.send("user login failed");
});

app.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  console.log(req.isAuthenticated());
  res.send("user logout successfully");
})

app.listen(5000);
