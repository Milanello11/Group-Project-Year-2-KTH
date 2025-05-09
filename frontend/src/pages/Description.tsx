import React, {useEffect, useState} from "react";
import styles from "./Description.module.css"
import { CalendarDays, MapPin} from 'lucide-react';
import {useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";
import {handleBooking} from "../handleBooking";

type Artist = {
    artist_name: string;
    age: number;
}

export default function Description(){

    const { state } = useLocation();
    const [cookies] = useCookies(["userID"]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true); // Lägg till loading state


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        festivalId,
        festivalName,
        festivalLocation,
        festivalDate,
        ticketsLeft,
        imageURL,
        festivalDescription
    } = state;

    useEffect(() => {
        if (!state) return;
        const fetchArtists = async () => {
            try {
                const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/festival/getartists/${festivalId}`);
                if (response.ok) {
                    const data = await response.json();
                    setArtists(data);
                } else {
                    console.error("Failed to fetch artists");
                }
            } catch (err) {
                console.error("Error fetching artists:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, [festivalId, state]);

    if (!state) {
        return <p>Error: No festival data available.</p>;
    }

    return (
        <div>
            <div
                className={styles.backgroundPicture}
                style={{ backgroundImage: `url(${process.env["REACT_APP_API_URL"]}${imageURL})` }}
            >
                <p className={styles.festivalName}>{festivalName}</p>
            </div>
            <div className={styles.imageDivider}/>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Date and location</h2>
                <div className={styles.infoRow}>
                    <CalendarDays className={styles.icon} />
                    <p>{festivalDate}</p>
                </div>
                <div className={styles.infoRow}>
                    <MapPin className={styles.icon} />
                    <p>{festivalLocation}</p>
                </div>

                <h3 className={styles.subTitle}>Lineup:</h3>
                <div className={styles.lineup}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : artists.length === 0 ? (
                        <p>No artists added yet</p>
                    ) : (
                        artists.map((artist, index) => (
                            <p key={index}>{artist.artist_name}</p>
                        ))
                    )}
                </div>

                <h3 className={styles.subTitle}>Description:</h3>
                <p className={styles.description}>{festivalDescription}</p>

                <h3 className={styles.subTitle}>Tickets left: <span className={styles.ticketCount}>{ticketsLeft}</span></h3>
                <button className={styles.buyButton} onClick=
                    {() => handleBooking(festivalId, cookies.userID)}>Buy Ticket</button>
            </div>
        </div>
    )
}