import React from "react";
import {Route, NavLink, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import FestivalBox from "./components/FestivalBox";

function App() {
  return (
      <Router>
        <div className="App">
          <NavBar />
          <h1> festis</h1>
          <ul className = "header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">about</NavLink></li>
          </ul>
          <div className ="pageContent">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
            </Routes>
          </div>
          <FestivalBox />
        </div>
      </Router>
  );
}

export default App;
