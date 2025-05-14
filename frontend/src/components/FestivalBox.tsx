import {Flex, Box, Collapsible} from "@chakra-ui/react";
import styles from './FestivalBox.module.css';
import { useCookies } from "react-cookie";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

/**
 * `FestivalBox` is a UI component that displays a festival image, name, date, and location.
 * The box itself acts as a clickable link that routes the user to a detailed description page with booking functionality.
 *
 * @param props - The properties used to render the festival information.
 * @returns A clickable JSX element containing festival details.
 *
 * @author Max Masuch
 * @author Ismail Mohammed
 * @author Johan Karlsson
 * @author Elias Almlöf
 * @author Milan Hatami
 */

type FestivalProps = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
    imageURL: string;
    festivalDescription?: string;
};


export default function FestivalBox({festivalId, festivalName, festivalLocation,
                                    festivalDate, ticketsLeft, imageURL, festivalDescription}: FestivalProps){
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
        <Flex direction="row">
                    <Box onClick={handleClick} position="relative" className={styles.clickableBox}>
                        <Box position="relative">
                            <img src={`${process.env["REACT_APP_API_URL"]}${imageURL}`} alt={festivalName} className={styles.Image}/>
                            <div className={styles.overlayContent}>
                                <p className={styles.overlayText}>{festivalName}</p>
                                <p className={styles.overlayTextDate}>
                                    {festivalDate}, {festivalLocation}
                                </p>
                            </div>
                        </Box>
                    </Box>
        </Flex>
    );
}
