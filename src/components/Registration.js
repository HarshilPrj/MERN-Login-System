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

const Registration = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [no, setNo] = useState("");
  const [file, setFile] = useState("");

  const register = () => {
    Axios.post("http://localhost:5000/add_user", {
      user_name: user_name,
      password: password,
      no: no,
      photo:file
    }).then((res) => {
      navigate("/login");
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
              marginTop: "2rem",
              padding: "1rem",
              height: "30rem",
              width: "30rem",
              borderRadius: "1rem",
              backgroundColor: "lightcyan",
            }}
          >
            <Stack spacing={4} sx={{ display: "flex", marginTop: "10px" }}>
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
              <div>
                <Button variant="contained" onClick={register}  sx={{ width: "18vw" }}>
                  Create Account
                </Button>
                <Button variant="contained" component="label" sx={{ width: "19vw",  marginTop:"-4rem", marginLeft:"15rem" }}>
                  Upload
                  <input hidden accept=".png" multiple type="file"  onChange={(e) => {
                  setFile(e.target.files[0].name);
                }} />
                </Button>
              </div>
            </Stack>
          </Paper>
        </form>
      </Grid>
    </>
  );
};
export default Registration;
