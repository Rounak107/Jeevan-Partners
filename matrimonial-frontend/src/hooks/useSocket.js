// // src/hooks/useSocket.js
// import { useContext } from 'react';
// import { SocketContext } from '../context/SocketContext'; // Fixed import path

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };
import { useEffect, useState, useCallback } from 'react';

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        const checkEcho = () => {
            if (window.Echo) {
                setEcho(window.Echo);
                
                // Set up connection monitoring
                const pusher = window.Echo.connector?.pusher;
                if (pusher) {
                    pusher.connection.bind('connected', () => {
                        console.log('✅ Pusher connected');
                        setIsConnected(true);
                    });
                    
                    pusher.connection.bind('disconnected', () => {
                        console.log('❌ Pusher disconnected');
                        setIsConnected(false);
                    });
                    
                    pusher.connection.bind('error', (error) => {
                        console.error('❌ Pusher error:', error);
                        setIsConnected(false);
                    });

                    // Set initial state
                    setIsConnected(pusher.connection.state === 'connected');
                }
            } else {
                // Retry after a short delay
                setTimeout(checkEcho, 100);
            }
        };

        checkEcho();

        return () => {
            // Cleanup
            const pusher = window.Echo?.connector?.pusher;
            if (pusher) {
                pusher.connection.unbind('connected');
                pusher.connection.unbind('disconnected');
                pusher.connection.unbind('error');
            }
        };
    }, []);

    const registerUser = useCallback((userId) => {
        if (!window.Echo || !userId) {
            console.warn('Echo not available for user registration');
            return;
        }
        
        try {
            console.log(`👤 Registering user ${userId} with Echo`);
            // Presence channel registration would go here if needed
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }, []);

    return {
        socket: echo ? echo.connector : null,
        isConnected,
        registerUser,
        Echo: echo
    };
};