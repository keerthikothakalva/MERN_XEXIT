import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        // Implement API call to validate user login
        if (username === 'admin' && password === 'admin') {
            setUser({ username, role: 'HR' });
            setIsAuthenticated(true);
        } else if (username && password) {
            setUser({ username, role: 'Employee' });
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
