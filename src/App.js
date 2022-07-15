import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Bar1 from "./components/AppBar";
import Dashbord from "./components/Dashbord";
import Profile from "./components/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Bar1 />
        <Routes>
          <Route excat path="/home" element={<Dashbord />} />
          <Route excat path="/add_user" element={<Registration />} />
          <Route excat path="/login" element={<Login />} />
          <Route excat path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
