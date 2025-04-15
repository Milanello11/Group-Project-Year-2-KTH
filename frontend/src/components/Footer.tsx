import React from "react";
import logo from '../assets/logo.png';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import youtubeIcon from '../assets/youtube.png';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <img src={logo} alt="logo"/>
            <p>Festis</p>
            <div className="footer-divider">
                <div className="social-icons">
                    <img src={facebookIcon} alt="Facebook" />
                    <img src={linkedinIcon} alt="Twitter" />
                    <img src={instagramIcon} alt="Instagram" />
                    <img src={youtubeIcon} alt="GitHub" />
                </div>
            </div>
            <p>© 2025 Festis. All rights reserved.</p>
        </footer>
    )
}
