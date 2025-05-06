import {Flex, Box, Collapsible} from "@chakra-ui/react";
import styles from './FestivalBox.module.css';
import bkImage from '../assets/coachellaImg.png';
import { useCookies } from "react-cookie";
import { ChevronUp} from "lucide-react";
import { useState } from "react";
import { toaster } from "./ui/toaster"

type FestivalProps = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    hideBookingButton?: boolean;
};


export default function FestivalBox({festivalId, festivalName, festivalLocation,
                                    festivalDate,ticketsLeft, hideBookingButton}: FestivalProps){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [cookies] = useCookies(["userID"]);
    const handleBooking = async () => {
        if (cookies.userID === null || cookies.userID === 0 || cookies.userID === undefined) {
           toaster.create({
               title: "You must be logged in as a user.",
               description: "Please log in to book a ticket.",
               status: "warning",
               duration: 4000,
               isClosable: true,
           });
           return;
        }


        try {
            const response = await fetch(`http://localhost:8080/api/booking/${festivalId}/${cookies.userID}`, {
                method: "POST",
            });

            if (response.ok) {
                toaster.create({
                    title: "Booking successful",
                    description: "Your ticket has been booked!",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toaster.create({
                    title: "Booking failed",
                    description: "Something went wrong",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (err) {
            console.error("Booking error: ", err);
            toaster.create({
                title: "Network error",
                description: "Could not connect to the server.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="row"  gap={10}>
                <Collapsible.Root key={festivalId} >
                    <Box position="relative">
                        <Box position="relative">
                            <img src={bkImage} alt={festivalName} className={styles.Image}/>
                            <div className={styles.overlayContent}>
                                <p className={styles.overlayText}>{festivalName}</p>
                                <p className={styles.overlayTextDate}>
                                    {festivalDate}, {festivalLocation}
                                </p>
                                <Box className={styles.Info}>
                                    <Collapsible.Trigger onClick={toggle}>
                                        <ChevronUp
                                            className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
                                            size={24}
                                        />
                                    </Collapsible.Trigger>
                                </Box>
                                {!hideBookingButton && (
                                    <Box>
                                        <button className={styles.overlayButton} onClick={handleBooking}>
                                            Buy ticket
                                        </button>
                                    </Box>
                                )}
                            </div>
                        </Box>
                        <Collapsible.Content>
                            <Box className={styles.floatingContent}
                                mt="2"
                                p="3"
                                border="1px solid #ccc"
                                backgroundColor="#f9f9f9"
                                fontSize="14px"
                            >
                                <p > Tickets left: {ticketsLeft}</p>
                            </Box>
                        </Collapsible.Content>
                    </Box>
                </Collapsible.Root>
        </Flex>
    );
}
