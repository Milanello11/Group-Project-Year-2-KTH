import React, {useEffect} from "react";
import styles from "./Description.module.css"
import { CalendarDays, MapPin} from 'lucide-react';
import {useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";
import {handleBooking} from "../handleBooking";

export default function Description(){

    const { state } = useLocation();
    const [cookies] = useCookies(["userID"]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!state) {
        return <p>Error: No festival data available.</p>;
    }

    const {
        festivalId,
        festivalName,
        festivalLocation,
        festivalDate,
        ticketsLeft,
        imageURL,
        festivalDescription
    } = state;

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
                <p className={styles.lineup}>lineup</p>

                <h3 className={styles.subTitle}>Description:</h3>
                <p className={styles.description}>{festivalDescription}</p>

                <h3 className={styles.subTitle}>Tickets left: <span className={styles.ticketCount}>{ticketsLeft}</span></h3>
                <button className={styles.buyButton} onClick=
                    {() => handleBooking(festivalId, cookies.userID)}>Buy Ticket</button>
            </div>
        </div>
    )
}