import React, { createContext, useState, ReactNode, useContext } from "react";
import { useCookies } from "react-cookie";

type User = {
    id: number;
    username: string;
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["userID", "username"]);
    const [user, setUser] = useState<User | null>(() => {
        const userId = cookies.userID;
        const username = cookies.username;
        return userId && username ? { id: parseInt(userId), username } : null;
    });

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/find/${username}/${password}`);
            const data = await response.json();
            if (data > 0) {
                setUser({ id: data, username });
                setCookie("userID", data.toString(), { path: "/" });
                setCookie("username", username, { path: "/" });
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
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