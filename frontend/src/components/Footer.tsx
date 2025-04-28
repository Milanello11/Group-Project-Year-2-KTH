import React from "react";
import logo from '../assets/logo.png';
import { Facebook, Linkedin, Instagram, Youtube} from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={logo} alt="logo" className={styles.logo} />
            <p>Festis</p>
            <div className={styles.footerDivider}>
                <div className={styles.socialIcons}>
                    <Facebook/>
                    <Instagram/>
                    <Linkedin/>
                    <Youtube/>
                </div>
            </div>
            <p>© 2025 Festis. All rights reserved.</p>
        </footer>
    )
}
