import { Flex, Box, Spacer } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import styles from './NavBar.module.css';
import logo from '../assets/logo.png';
import LogInMenu from "../components/LogInMenu";

export default function NavBar() {
    return (
        <Flex className={styles.navBar}>
            <Box className={styles.imageBox}>
                <img src={logo} alt="logo" className={styles.logo} />
            </Box>
            <Spacer />
            <Flex>
                <Box className={styles.navbarLink}>
                    <NavLink to="/" className={styles.navbarLink}>Home</NavLink>
                </Box>
                <Box className={styles.navbarLink}>
                    <NavLink to="/About" className={styles.navbarLink}>About</NavLink>
                </Box>
                <LogInMenu />
            </Flex>
        </Flex>
    );
}