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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    Axios.post("http://localhost:5000/login", {
      user_name: user_name,
      password: password,
    })
      .then((res) => {
        if (res.data.Error) {
          window.alert("Invalid credentials");
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        window.alert("user Not found");
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
          backgroundColor: "lightskyblue",
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
              backgroundColor: "lightcyan",
            }}
          >
            <Stack spacing={6} sx={{ display: "flex" }}>
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

              <div>
                <Button
                  variant="contained"
                  onClick={login}
                  sx={{ width: "24vw" }}
                >
                  Sign In
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/add_user")}
                  sx={{ width: "23vw", marginLeft: "2rem" }}
                >
                  Sign Up
                </Button>
              </div>
            </Stack>
          </Paper>
        </form>
      </Grid>
    </>
  );
};
export default Login;