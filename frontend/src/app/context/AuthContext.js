"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const t = localStorage.getItem("quik-cart-token-v1");
        const u = localStorage.getItem("quik-cart-user");

        if (t) setToken(t);
        if (u) setUser(JSON.parse(u));
    }, []);

    const login = (token, user) => {
        localStorage.setItem("quik-cart-token-v1", token);
        localStorage.setItem("quik-cart-user", JSON.stringify(user));

        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("quik-cart-token-v1");
        localStorage.removeItem("quik-cart-user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);