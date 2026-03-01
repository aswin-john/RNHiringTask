import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout, signup } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while checking for existing session

    // On app launch: check if there is an active Appwrite session
    useEffect(() => {
        (async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        })();
    }, []);

    const handleLogin = async (email, password) => {
        await login(email, password);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };

    const handleSignup = async (name, email, password) => {
        await signup(name, email, password);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isLoggedIn: !!user,
                login: handleLogin,
                signup: handleSignup,
                logout: handleLogout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
