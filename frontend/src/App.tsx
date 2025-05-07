import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import AcceptCookies from "./components/AcceptCookies";
import { AuthProvider } from "./components/context/AuthContext";
import { CookiesProvider } from "react-cookie";
import styles from './App.module.css';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <AuthProvider>
          <div className={styles.pageWrapper}>
            <NavBar />
              <main className={styles.content}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
            <Footer />
          </div>
          <AcceptCookies />
        </AuthProvider>
      </Router>
    </CookiesProvider>
  );
}

export default App;