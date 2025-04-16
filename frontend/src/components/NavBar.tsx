import {Flex, Box, Spacer, IconButton, Button} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import React from "react";
import styles from './NavBar.module.css';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar-icon.png';


export default function NavBar() {
    return (
        <Flex className={styles.navBar}>
            <Box className={styles.imageBox}>
                <img src={logo} alt="logo" className={styles.logo} />
            </Box>
            <Spacer/>
            <Flex >
                <Box className={styles.navbarLink}>
                    <NavLink to="/" className={styles.navbarLink}>Home</NavLink>
                </Box>
                <Box className={styles.navbarLink}>
                    <NavLink to="/About" className={styles.navbarLink}>About</NavLink>
                </Box>
                <Button variant="ghost" p={0} bg="transparent" display="flex" alignItems="center"
                        justifyContent="center" className={styles.navbarLink}>
                    {/* Ta bort inline styling för button ut i css fil*/}
                    <img src={avatar} alt="avatar-icon" className={styles.profileIcon} />
                </Button>
                </Flex>
        </Flex>
    )
}
