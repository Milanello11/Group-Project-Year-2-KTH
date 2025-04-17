import React from "react";
import styles from "./About.module.css"
import AboutImage from "../assets/about/aboutImg.png"
import MilanIcon from "../assets/about/milanIcon.png"
import EliasIcon from "../assets/about/eliasIcon.png"
import IsseIcon from "../assets/about/isseIcon.png"
import JohanIcon from "../assets/about/johanIcon.png"
import MaxIcon from "../assets/about/maxIcon.png"

const contacts = [
    { name: "Milan Hatami", image: MilanIcon, mail: "johkar2@kth.se"},
    { name: "Johan Karlsson", image: JohanIcon, mail: "milanh@kth.se"},
    { name: "Ismail Mohammed", image: IsseIcon, mail: "iamoh@kth.se"},
    { name: "Elias Almlöf", image: EliasIcon, mail: "eliapa@kth.se"},
    { name: "Max Masuch", image: MaxIcon, mail: "masuch@kth.se"},
];

const About: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.aboutContainer}>
                <img src={AboutImage} alt="Festival Crowd" className={styles.aboutImage} />
                <div className={styles.aboutText}>
                    <h2>About Us</h2>
                    <p>
                        We’re a group of five friends who share a deep love for music, culture,
                        and the unforgettable energy of live festivals. After years of chasing lineups,
                        struggling with last-minute ticket hunts, and comparing endless event sites,
                        we realized something was missing — a central place to discover, compare, and book festivals with ease.
                        That’s why we created Festis — a festival booking platform built by festival lovers,
                    </p>
                    <p>
                        for festival lovers. Our mission is simple: to make it easier than ever to find your next
                        great festival experience, whether it’s a weekend in the woods or a city takeover with your favorite
                        artists. From EDM to folk, from food fests to film, we’ve got something for everyone.
                        We’re constantly updating our listings, partnering with organizers, and finding new ways to connect
                        fans with unforgettable events. Join us — and let’s make your next festival the best one yet.
                    </p>
                </div>
            </div>

            <h2 className={styles.contactTitle}>Contacts</h2>
            <div className={styles.contactList}>
                {contacts.map((contact, index) => (
                    <div className={styles.contactCard} key={index}>
                        <img src={contact.image} alt={`${contact.name} icon`} className={styles.avatar} />
                        <p>{contact.name}</p>
                        <p>{contact.mail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
