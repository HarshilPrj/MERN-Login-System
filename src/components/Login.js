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


const Login = () => {

    const [user_name, setUser_name] = useState("");
    const [password, setPassword] = useState("");
    // const [loginStatus, setLoginStatus] = useState('');

    
  const login = () => {
    Axios
      .post("http://localhost:5000/login", {
        user_name: user_name,
        password: password,
      })
      .then((res) => {
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
              padding: "1rem",
              height: "30rem",
              width: "40rem",
              borderRadius: "1rem",
              backgroundColor:'lightcyan'
              backgroundColor:'lightcyan'
              
            }}
          >
            <Stack spacing={6} sx={{ display: "flex"}}>
              <h1 id="h1"> Login </h1>
              <TextField
                required
                id="standard-search6"
                label="Email"
                type="email"
                variant="standard"
                onChange={(e) => {
                    setUser_name(e.target.value);
                }}
              />
              <TextField
                required
                id="standard-search5"
                label="Password"
                type="password"
                variant="standard"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox id="checkbox2" required />}
                label="I accept all the terms & conditions."
              />

              <Button variant="contained" onClick={login}>
                Sign In
              </Button>
              {/* <h1>{loginStatus}</h1> */}
              {/* <Button variant="contained" onClick={() => navigate("/registration")}>Sign Up</Button> */}
            </Stack>
          </Paper>
        </form>
      </Grid>
    </>
  );
};
export default Login;
