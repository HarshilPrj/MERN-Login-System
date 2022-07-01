import React from "react";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const Registration = () => {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [no, setNo] = useState("");

  const register = () => {
    Axios.post("http://localhost:5000/add_user", {
      user_name: user_name,
      password: password,
      no: no,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          backgroundImage: `url(${"../image/1236631.jpg"})`,
          backgroundSize: "cover",
          backgroundColor:"lightskyblue"
        }}
      >
        <form>
          <Paper
            elevation={20}
            sx={{
              marginTop: "2rem",
              padding: "1rem",
              height: "35rem",
              width: "40rem",
              borderRadius: "1rem",
              backgroundColor:'lightcyan'
            }}
          >
            <Stack spacing={6} sx={{ display: "flex", marginTop: "10px" }}>
              <h1 id="h1"> Registration</h1>
              <TextField
                required
                id="standard-search1"
                label="Email"
                type="email"
                variant="standard"
                onChange={(e) => {
                  setUser_name(e.target.value);
                }}
              />
              <TextField
                required
                id="standard-search2"
                label="Password"
                type="password"
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                required
                id="standard-search3"
                label="Mobile Number"
                type="tel"
                variant="standard"
                pattern="[0-9]{5}-[0-9]{5}"
                onChange={(e) => {
                  setNo(e.target.value);
                }}
              />
              <FormControlLabel
                label="I accept all the terms & conditions."
                control={<Checkbox id="checkbox" required />}
              />

              <Button variant="contained" onClick={register}>
                Create Account
              </Button>
            </Stack>
          </Paper>
        </form>
      </Grid>
    </>
  );
};
export default Registration;
