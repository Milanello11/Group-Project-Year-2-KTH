import { Flex, Box, Spacer } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import styles from './NavBar.module.css';
import LogInMenu from "../components/LogInMenu";
import testLogo from '../assets/logoIcon.svg';

export default function NavBar() {
    return (
        <Flex className={styles.navBar}>
            <Box className={styles.imageBox}>
                <img src={testLogo} alt="Logo" className={styles.logo} />
            </Box>
            <Spacer />
            <Flex className={styles.align}>
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