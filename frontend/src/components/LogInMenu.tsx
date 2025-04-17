import { Box, Input, Stack, Button, Collapsible } from "@chakra-ui/react";
import styles from "./LogInMenu.module.css";
import React, { useState } from "react";

type User = {
    id: number;
    username: string;
    password: string;

};

const LogInMenu = () => {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();


        fetch(`http://localhost:8080/api/user/findbyname/${username}/${password}`)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error logging in:", error));
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
                        <p>Welcome, {user.username}!</p>
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