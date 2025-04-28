import { Box, Input, Stack, Button, Collapsible, Flex } from "@chakra-ui/react";
import styles from "./LogInMenu.module.css";
import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { NavLink } from "react-router-dom";

const LogInMenu = () => {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
    };

    const handleLogout = () => {
        logout();
        setUsername("");
        setPassword("");
    };

    return (
        <Collapsible.Root>
            <Collapsible.Trigger asChild>
                <Button variant="ghost" p={0} bg="transparent" className={styles.avatarButton}>
                    <CircleUserRound className={styles.avatarIcon}/>
                </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <Box p="4" bg="gray.100" rounded="md" shadow="md" mt="2" className={styles.logInMenu}>
                    {user ? (
                        <Flex>
                            <Flex className={styles.userSection}>
                                <img src={require("../assets/avatar-icon.png")} alt="avatar-icon" className={styles.avatarIcon} />
                                <Box>
                                    <p>{user.username}</p>
                                </Box>
                            </Flex>
                            <Flex className={styles.navSection}>
                                <NavLink to="/Profile" state={{ userId: user.id }}>Profile</NavLink>
                                <p onClick={handleLogout} className={styles.logoutLink}>Log out</p>
                            </Flex>
                        </Flex>
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