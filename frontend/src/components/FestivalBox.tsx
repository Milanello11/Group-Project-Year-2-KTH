import {Flex, Box, Collapsible} from "@chakra-ui/react";
import styles from './FestivalBox.module.css';
import { useCookies } from "react-cookie";
import { ChevronUp} from "lucide-react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {handleBooking} from "../handleBooking";

type FestivalProps = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageURL: string;
    hideBookingButton?: boolean;
    festivalDescription?: string;
};


export default function FestivalBox({festivalId, festivalName, festivalLocation,
                                    festivalDate,ticketsLeft,imageURL,hideBookingButton, festivalDescription}: FestivalProps){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [cookies] = useCookies(["userID"]);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/description/${festivalId}`, {
            state: {
                festivalId,
                festivalName,
                festivalLocation,
                festivalDate,
                ticketsLeft,
                imageURL,
                festivalDescription,
            }
        });
    };

    return (
        <Flex direction="row"  gap={10}>
                <Collapsible.Root key={festivalId} >
                    <Box onClick={handleClick} position="relative" className={styles.clickableBox}>
                        <Box position="relative">
                            <img src={`${process.env["REACT_APP_API_URL"]}${imageURL}`} alt={festivalName} className={styles.Image}/>
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
                                        <button className={styles.overlayButton} onClick=
                                            {() => handleBooking(festivalId, cookies.userID)}>
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
