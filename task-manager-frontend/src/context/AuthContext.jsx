import { createContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosinstances";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUser();
        } else {
            setUser(null);
        }
    }, [isAuthenticated]);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            setUser(response.data);
        } catch (err) {
            logout();
        }
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                user,
                setUser,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};