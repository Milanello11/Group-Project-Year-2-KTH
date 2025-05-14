import {Flex, Box} from "@chakra-ui/react";
import styles from './FestivalBox.module.css';
import {useNavigate} from "react-router-dom";

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
                                    festivalDate,ticketsLeft,imageURL, festivalDescription}: FestivalProps){
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
