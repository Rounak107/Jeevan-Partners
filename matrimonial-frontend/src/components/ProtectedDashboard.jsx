import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedDashboard = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        checkAuthentication();
    }, []);

    useEffect(() => {
    const checkSession = () => {
        const loginTime = localStorage.getItem('dashboard_login_time');
        if (loginTime) {
            const loginDate = new Date(loginTime);
            const currentTime = new Date();
            const hoursDiff = (currentTime - loginDate) / (1000 * 60 * 60);
            
            // Auto logout after 24 hours
            if (hoursDiff > 24) {
                localStorage.removeItem('dashboard_authenticated');
                localStorage.removeItem('dashboard_login_time');
                setIsAuthenticated(false);
            }
        }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // Check every minute

    return () => clearInterval(interval);
}, []);

    const checkAuthentication = () => {
        const authenticated = localStorage.getItem('dashboard_authenticated') === 'true';
        setIsAuthenticated(authenticated);
    };

    // Show loading while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/dashboard-login" replace />;
    }

    // Render dashboard if authenticated
    return children;
};

export default ProtectedDashboard;