import {Box, Input, Stack, Button, Collapsible, Flex} from "@chakra-ui/react";
import styles from "./LogInMenu.module.css";
import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import {NavLink, useNavigate} from "react-router-dom";
import {CircleUserRound} from "lucide-react";
import { toaster } from "./ui/toaster"

const LogInMenu = () => {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
    };

    const handleLogout = () => {
        logout();
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/");
    };

    const isValidEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return pattern.test(email);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password || !email) {
            toaster.create({
                description: "Please fill in all fields!",
                type: "warning",
                duration: 4000,
            });
            return;
        }

        if (!isValidEmail(email)) {
            toaster.create({
                description: "Please enter a valid email adress!",
                type: "warning",
                duration: 4000,
            });
            return;
        }

        try {
            const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/user/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    username,
                    email,
                }),
            });

            if (response.ok) {
                toaster.create({
                    description: "Account created successfully! Please log in.",
                    type: "success",
                    duration: 4000,
                });
                setShowSignUp(false);
                setUsername("");
                setPassword("");
                setEmail("");
            } else {
                const errorData = await response.json();
                console.error("Sign Up failed:", errorData);
                toaster.create({
                    description: `Sign up failed: ${errorData.message}`,
                    type: "error",
                    duration: 4000,
                });
            }
        } catch (error) {
            console.error("Error signing up:", error);
            toaster.create({
                description: "An error occurred while signing up.",
                type: "error",
                duration: 4000,
            });
        }
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
                        <form onSubmit={showSignUp ? handleSignUp : handleLogin}>
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
                                {showSignUp && (
                                    <Box>
                                        <label className={styles.label}>Email</label>
                                        <Input
                                            placeholder="Enter your email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>
                                )}
                                <Button type="submit" colorScheme="orange" className={styles.submitButton}>
                                    {showSignUp ? "Sign Up" : "Log In"}
                                </Button>
                                <Button
                                    type="button" colorScheme="blue" className={styles.submitButton}
                                    onClick={() => setShowSignUp(!showSignUp)}
                                >
                                    {showSignUp ? "Already have an account? Log In" : "Sign Up"}
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