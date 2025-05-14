import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Button, Text } from "@chakra-ui/react";
import styles from "./AcceptCookies.module.css";
import { useAuth } from "./context/AuthContext";
import {toaster } from "./ui/toaster";

/**
 * `AcceptCookies` is a React functional component that displays a cookie consent banner.
 * It allows users to accept cookies and manages the session expiration based on cookies.
 *
 * Features:
 * - Displays a cookie consent banner if cookies are not accepted.
 * - Sets a cookie to track user consent.
 * - Logs out the user and removes the cookie when the session expires.
 *
 * @author Max Masuch
 * @author Ismail Mohammed
 * @author Johan Karlsson
 * @author Elias Almlöf
 * @author Milan Hatami
 */

const AcceptCookies = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["cookiesAccepted"]);
    const [isVisible, setIsVisible] = useState(!cookies.cookiesAccepted);
    const { logout } = useAuth();

    /**
     * Handles the acceptance of cookies by setting a cookie and hiding the banner.
     */
    const handleAccept = () => {
        setCookie("cookiesAccepted", "true", { path: "/", maxAge: 3600 });
        setIsVisible(false);
    };

    /**
     * Monitors the `cookiesAccepted` cookie and handles session expiration.
     * Logs out the user and removes the cookie when the session expires.
     *
     * @param {Object} cookies - The current cookies object.
     * @param {Function} removeCookie - Function to remove a cookie.
     * @param {Function} logout - Function to log out the user.
     */
    useEffect(() => {
        if (cookies.cookiesAccepted) {
            const maxAge = 3600*1000;
            const timer = setTimeout(() => {
                toaster.create({
                    title: "Session Expired",
                    description: "Your session has expired. Please log in again.",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                });
                removeCookie("cookiesAccepted", { path: "/" });
                logout();
            }, maxAge);

            return () => clearTimeout(timer);
        }
    }, [cookies, removeCookie, logout]);

    if (!isVisible) {
        return null;
    }

    return (
        <Box className={styles.acceptCookiesContainer}>
            <Text className={styles.acceptCookiesText}>
                We use cookies to improve your experience. By using our site, you accept our use of cookies.
            </Text>
            <Button colorScheme="orange" onClick={handleAccept}>
                Accept Cookies
            </Button>
        </Box>
    );
};

export default AcceptCookies;