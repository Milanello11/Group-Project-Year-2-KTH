import React from "react";
import {Route, NavLink, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import FestivalBox from "./components/FestivalBox";
import Footer from "./components/Footer";
import styles from './App.module.css';


function App() {
  return (
      <Router>
        <div className={styles.pageWrapper}>
          <NavBar />
            <main className={styles.content}>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
              </Routes>
            </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;



<div className={styles.pageWrapper}>
  <main className={styles.content}>
    {/* Your page content */}
  </main>
  <Footer />
</div>