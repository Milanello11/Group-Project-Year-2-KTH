import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Button, Text } from "@chakra-ui/react";
import styles from "./AcceptCookies.module.css";
import { useAuth } from "./context/AuthContext";


const AcceptCookies = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["cookiesAccepted"]);
    const [isVisible, setIsVisible] = useState(!cookies.cookiesAccepted);
    const { logout } = useAuth();

    const handleAccept = () => {
        setCookie("cookiesAccepted", "true", { path: "/", maxAge: 60 });
        setIsVisible(false);
    };

    useEffect(() => {
        if (cookies.cookiesAccepted) {
            const maxAge = 3600*1000;
            const timer = setTimeout(() => {

                removeCookie("cookiesAccepted", { path: "/" });
                logout();
            }, maxAge);

            return () => clearTimeout(timer);
        }
    }, [cookies, removeCookie]);

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