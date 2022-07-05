import React from "react";
import Axios from "axios";

const Dashbord = () => {
  Axios.get("http://localhost:5000/home", {});
  return (
    <>
      <p>Welcome To DashBord</p>
    </>
  );
};

export default Dashbord;
