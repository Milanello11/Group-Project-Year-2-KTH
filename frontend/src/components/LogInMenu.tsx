import {Box, Input, Stack, Button, Collapsible, Flex, Avatar} from "@chakra-ui/react";
import styles from "./LogInMenu.module.css";
import React, { useState } from "react";
import {NavLink} from "react-router-dom";

type User = {
    id: number;
    username: string;
    password: string;
    email: string;

};

const LogInMenu = () => {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();


        fetch(`http://localhost:8080/api/user/find/${username}/${password}`)
            .then((response) => response.json())
            .then((data) => {
            if (data === -1) {
                console.error("Login failed: Invalid credentials");
                alert("Login failed: Invalid credentials");
            } else {
                setUser({id: data, username: username, password: password, email: data.email});
                setEmail(data.email);
                console.log(data);
            }
                localStorage.setItem("userId", data);
        })
            .catch((error) => console.error("Error logging in:", error));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("userId");
        setUsername("");
        setPassword("");
        setEmail("");
        window.location.href = "/";
    };

    return (
        <Collapsible.Root>
            <Collapsible.Trigger asChild>
                <Button variant="ghost" p={0} bg="transparent" className={styles.avatarButton}>
                    <img src={require("../assets/avatar-icon.png")} alt="avatar-icon" className={styles.avatarIcon} />
                </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box p="4" bg="gray.100" rounded="md" shadow="md" mt="2" className={styles.logInMenu}>
                    {user ? (
                        (
                            <Flex>
                                <Flex className={styles.userSection}>
                                    <img src={require("../assets/avatar-icon.png")} alt="avatar-icon" className={styles.avatarIcon} />
                                    <Box>
                                        <p>{user.username}</p>
                                        <p>{user.email}</p>
                                    </Box>
                                </Flex>
                                <Flex className={styles.navSection}>
                                    <NavLink to="/Profile" state={{ userId: user.id }}> Profile </NavLink>
                                    <p onClick={handleLogout} className={styles.logoutLink}>Log out</p>
                                </Flex>
                            </Flex>
                        )
                    ) : (
                        <form onSubmit={handleLogin}>
                            <Stack gap="4">
                                <Box>
                                    <label className={styles.label}>Username</label>
                                    <Input
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <label className={styles.label}>Password</label>
                                    <Input
                                        placeholder="Enter your password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Box>
                                <Button type="submit" colorScheme="orange" className={styles.submitButton}>
                                    Log In
                                </Button>
                            </Stack>
                        </form>
                    )}
                </Box>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export default LogInMenu;