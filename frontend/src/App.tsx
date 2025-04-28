import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from './App.module.css';
import Profile from "./pages/Profile";


function App() {
  return (
      <Router>
        <div className={styles.pageWrapper}>
          <NavBar />
            <main className={styles.content}>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
              </Routes>
            </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;