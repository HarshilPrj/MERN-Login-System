const app = require("express")();
const axios = require("axios");

// The `res.redirect()` function sends back an HTTP 302 by default.
// When an HTTP client receives a response with status 302, it will send
// an HTTP request to the URL in the response, in this case `/to`
app.get("/from", async (req, res) => {
  res.redirect("/to");
});
app.get("/to", async (req, res) => {
    // res.send("Hello, World!");
    res.send("this is a test!");
});
app.listen(4000);

// const res = axios.get("http://localhost:3000/from");

