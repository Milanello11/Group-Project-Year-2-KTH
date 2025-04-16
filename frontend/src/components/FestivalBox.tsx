import { Flex, Box, Button, Collapsible} from "@chakra-ui/react";
import styles from './FestivalBox.module.css';
import bkImage from '../assets/coachellaImg.png';

type FestivalProps = {
    festivalId: number;
    festivalName: string;
    festivalLocation: string;
    festivalDate: string;
    ticketsLeft: number;
};


export default function FestivalBox({festivalId, festivalName, festivalLocation,
                                    festivalDate,ticketsLeft }: FestivalProps){
    return (
        <Flex direction="row"  gap={10}>
                <Collapsible.Root key={festivalId} >
                    <Box >
                        <Box position="relative">
                            <img src={bkImage} alt={festivalName} className={styles.Image}/>

                            <div className={styles.overlayContent}>
                                <p className={styles.overlayText}>{festivalName}</p>
                                <p className={styles.overlayTextDate}>
                                    {festivalDate}, {festivalLocation}
                                </p>
                                <Box className={styles.Info}>
                                    <Collapsible.Trigger>
                                            v
                                    </Collapsible.Trigger>
                                </Box>

                                <Box>
                                    <button className={styles.overlayButton}>Buy ticket</button>
                                </Box>
                            </div>
                        </Box>
                        <Collapsible.Content>
                            <Box
                                mt="2"
                                p="3"
                                border="1px solid #ccc"
                                borderRadius="md"
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
