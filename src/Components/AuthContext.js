// src/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Base URL for API
export const BASE_URL = 'http://13.60.197.154:8080';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthContext provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    const login = (userData, token) => {
        setAuth({
            isAuthenticated: true,
            user: userData,
            token: token,
        });
    };

    const logout = () => {
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
        });
    };

    const value = {
        auth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
