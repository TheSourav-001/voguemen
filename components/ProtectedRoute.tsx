
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // Redirect to auth page if not logged in
        return <Navigate to="/profile" replace />;
    }

    return <>{children}</>;
};
