import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Box, Button, Text } from "@chakra-ui/react";
import styles from "./AcceptCookies.module.css";

const AcceptCookies = () => {
    const [cookies, setCookie] = useCookies(["cookiesAccepted"]);
    const [isVisible, setIsVisible] = useState(!cookies.cookiesAccepted);

    const handleAccept = () => {
        setCookie("cookiesAccepted", "true", { path: "/", maxAge: 31536000 });
        setIsVisible(false);
    };

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