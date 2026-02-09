
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
    updateProfile: (data: { name?: string; avatar?: string; phone?: string; address?: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    user: { email: string; name?: string; id?: string; avatar?: string; phone?: string; address?: string } | null;
}

import API_URL from '../api-config';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        return !!localStorage.getItem('voguemen_token');
    });
    const [user, setUser] = useState<{ email: string; name?: string } | null>(() => {
        const saved = localStorage.getItem('voguemen_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
                localStorage.setItem('voguemen_token', data.token);
                localStorage.setItem('voguemen_user', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, error: data.error || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    const register = async (email: string, password: string, name?: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
                localStorage.setItem('voguemen_token', data.token);
                localStorage.setItem('voguemen_user', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, error: data.error || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    const updateProfile = async (updateData: { name?: string; avatar?: string; phone?: string; address?: string }) => {
        try {
            const token = localStorage.getItem('voguemen_token');
            const response = await fetch(`${API_URL}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('voguemen_user', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, error: data.error || 'Update failed' };
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('voguemen_token');
        localStorage.removeItem('voguemen_user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, register, updateProfile, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
