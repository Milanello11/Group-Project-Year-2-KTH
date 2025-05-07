import React from "react";
import styles from "./Description.module.css"
import backgroundImage from '../assets/backgroundimage.png';
import { CalendarDays, MapPin} from 'lucide-react';
import {useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";
import {toaster} from "../components/ui/toaster";

export default function Description(){

    const { state } = useLocation();
    const [cookies] = useCookies(["userID"]);


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

    const handleBooking = async () => {
        if (cookies.userID === null || cookies.userID === 0 || cookies.userID === undefined) {
            toaster.create({
                title: "You must be logged in as a user.",
                description: "Please log in to book a ticket.",
                type: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }


        try {
            const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/booking/${festivalId}/${cookies.userID}`, {
                method: "POST",
            });

            if (response.ok) {
                toaster.create({
                    title: "Booking successful",
                    description: "Your ticket has been booked!",
                    type: "success",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toaster.create({
                    title: "Booking failed",
                    description: "Something went wrong",
                    type: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (err) {
            console.error("Booking error: ", err);
            toaster.create({
                title: "Network error",
                description: "Could not connect to the server.",
                type: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    console.log(festivalDescription);

    return (
        <div>
            <div
                className={styles.backgroundPicture}
                style={{ backgroundImage: `url(http://localhost:8080${imageURL})` }}
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

                <h3 className={styles.subTitle}>Line up:</h3>
                <p className={styles.lineup}>lineup</p>

                <h3 className={styles.subTitle}>Description:</h3>
                <p className={styles.description}>{festivalDescription}</p>

                <h3 className={styles.subTitle}>Tickets left: <span className={styles.ticketCount}>{ticketsLeft}</span></h3>
                <button className={styles.buyButton} onClick={handleBooking}>Buy Ticket</button>
            </div>
        </div>
    )
}