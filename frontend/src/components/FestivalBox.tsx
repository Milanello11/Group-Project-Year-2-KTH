import {Flex, Box, Button, Spacer} from "@chakra-ui/react";
import React from "react";
import styles from './FestivalBox.module.css';
import bkImage from '../assets/coachellaImg.png';


export default function festivalBox(){
return(
    <Flex>
        <Box position="relative">
            <img src={bkImage} alt="Coachella" className={styles.Image} />
            <div className={styles.overlayContent}>
                <p className={styles.overlayText}>Coachella</p>
                <p className={styles.overlayTextDate}>2025-09-09, Stockholm</p>
                <Button className={styles.overlayButton}>Buy ticket</Button>
            </div>
        </Box>
    </Flex>
    )

}

