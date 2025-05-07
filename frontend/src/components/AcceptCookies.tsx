import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Button, Text } from "@chakra-ui/react";
import styles from "./AcceptCookies.module.css";
import { useAuth } from "./context/AuthContext";
import {toaster } from "./ui/toaster";



const AcceptCookies = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["cookiesAccepted"]);
    const [isVisible, setIsVisible] = useState(!cookies.cookiesAccepted);
    const { logout } = useAuth();

    const handleAccept = () => {
        setCookie("cookiesAccepted", "true", { path: "/", maxAge: 3600 });
        setIsVisible(false);
    };

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