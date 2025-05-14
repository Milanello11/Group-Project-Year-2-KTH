import {Box, Input, Stack, Button, Collapsible, Flex, Spinner} from "@chakra-ui/react";
import styles from "./LogInMenu.module.css";
import React, { useState, useEffect, useRef} from "react";
import { useAuth } from "./context/AuthContext";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CircleUserRound} from "lucide-react";
import { toaster } from "./ui/toaster"

/**
* `LogInMenu` is a React functional component that provides a collapsible login menu.
* It allows users to log in, sign up, or log out, and displays user-specific navigation options.
*
* Features:
* - Login and logout functionality.
* - Sign-up form with email validation.
* - Displays user information and navigation links based on user role.
* - Collapsible menu that closes when clicking outside or navigating to a new route.
*
* @author Max Masuch
* @author Ismail Mohammed
* @author Johan Karlsson
* @author Elias Almlöf
* @author Milan Hatami
*/

const LogInMenu = () => {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuRef = useRef<HTMLDivElement>(null);

    /**
     * Closes the menu when the route changes.
     */
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    /**
     * Closes the menu when clicking outside of it.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(username, password);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/");
    };

    /**
     * Validates the email format.
     *
     * @param {string} email - The email to validate.
     * @returns {boolean} Whether the email is valid.
     */
    const isValidEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return pattern.test(email);
    };

    /**
     * Handles the sign-up process.
     * Validates the input fields and sends a POST request to create a new user.
     */
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
                const text = await response.text();
                if (text === "Success") {
                    toaster.create({
                        description: "Account created successfully! Please log in.",
                        type: "success",
                        duration: 4000,
                    });
                    setShowSignUp(false);
                    setUsername("");
                    setPassword("");
                    setEmail("");
                }
                else if (text === "Username-Taken") {
                    toaster.create({
                        description: "User already exists!",
                        type: "error",
                        duration: 4000,
                    });
                }
            } else {
                const errorData = await response.json();
                console.error("Sign Up failed:", errorData);
                toaster.create({
                    description: `Sign up failed: ${errorData}`,
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
        <div ref={menuRef}>
        <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
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
                                    <p>{user.role === "admin" ? "Admin" : user.username}</p>
                                </Box>
                            </Flex>
                            <Flex className={styles.navSection}>
                                {user.role === "admin" ? (
                                    <NavLink to="/Admin">Admin Page</NavLink>
                                ) : (
                                    <NavLink to="/Profile">Profile</NavLink>
                                )}
                                <p onClick={handleLogout} className={styles.logoutLink}>Log out</p>
                            </Flex>
                        </Flex>
                    ) : (
                        <form onSubmit={showSignUp ? handleSignUp : handleLogin}>
                            <Stack gap="4">
                                <Box>
                                    <label htmlFor="username" className={styles.label}>Username</label>
                                    <Input
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        autoComplete="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <label htmlFor="password" className={styles.label}>Password</label>
                                    <Input
                                        id="password"
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>
                                )}
                                <Button type="submit" colorScheme="orange" className={styles.submitButton} disabled={loading}>
                                    {loading ? <Spinner size="sm" /> : (showSignUp ? "Sign Up" : "Log In")}
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
        </div>
    );
};

export default LogInMenu;