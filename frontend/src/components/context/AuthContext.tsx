import React, { createContext, useState, ReactNode, useContext } from "react";
import { useCookies } from "react-cookie";
import { toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";


type User = {
    id: number;
    username: string;
    role: "user" | "admin";
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["userID", "username"]);
    const [user, setUser] = useState<User | null>(() => {
        const userId = cookies.userID;
        const username = cookies.username;
        return userId && username ? { id: parseInt(userId), username, role: "user" } : null;
    });

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(`${process.env["REACT_APP_API_URL"]}/api/user/login/${username}/${password}`);
            const data = await response.json();
            if (data > 0) {
                setUser({ id: data, username, role: "user" });
                setCookie("userID", data.toString(), { path: "/" });
                setCookie("username", username, { path: "/" });
            } else if (data === 0){
                navigate("/admin");
                setUser({ id: data, username, role: "admin" });
                setCookie("userID", data.toString(), { path: "/admin" });
                setCookie("username", username, { path: "/admin" });
                toaster.create({
                    description: "Logged in as Admin",
                    type: "success",
                    duration: 4000,
                });
            } else if (data === -1){
                toaster.create({
                    description: "Invalid password",
                    type: "error",
                    duration: 4000,
                });
            } else if (data === -2){
                toaster.create({
                    description: `No user with username: ${username} found`,
                    type: "error",
                    duration: 4000,
                });
            } else {
                toaster.create({
                    description: `Error!, ${response}`,
                    type: "error",
                    duration: 4000,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toaster.create({
                description: `Login error ${error}`,
                type: "error",
                duration: 4000,
            })
        }
    };

    const logout = () => {
        setUser(null);
        removeCookie("userID", { path: "/" });
        removeCookie("username", { path: "/" });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};