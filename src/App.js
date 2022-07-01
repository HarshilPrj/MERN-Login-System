import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Bar1 from "./components/Bar1";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Bar1 />
        <Routes>
          <Route excat path="/" />
          <Route excat path="/login" element={<Login />} />
          <Route  excat path="/add_user" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
