import React from "react";
import logo from '../assets/logo.png';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import youtubeIcon from '../assets/youtube.png';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={logo} alt="logo" className={styles.logo} />
            <p>Festis</p>
            <div className={styles.footerDivider}>
                <div className={styles.socialIcons}>
                    <img src={facebookIcon} alt="Facebook" />
                    <img src={linkedinIcon} alt="LinkedIn" />
                    <img src={instagramIcon} alt="Instagram" />
                    <img src={youtubeIcon} alt="Youtube" />
                </div>
            </div>
            <p>© 2025 Festis. All rights reserved.</p>
        </footer>
    )
}
