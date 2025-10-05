// // src/context/SocketContext.jsx
// /* eslint-disable react-refresh/only-export-components */
// import React, { createContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const newSocket = io('http://localhost:3001', {
//       transports: ['websocket'],
//       autoConnect: true
//     });

//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Socket connected globally');
//       setIsConnected(true);
      
//       // Register user if we have userId
//       const userId = localStorage.getItem('userId');
//       if (userId) {
//         newSocket.emit('register', userId);
//       }
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Socket disconnected');
//       setIsConnected(false);
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   const value = {
//     socket,
//     isConnected,
//     registerUser: (userId) => {
//       if (socket) {
//         socket.emit('register', userId);
//         localStorage.setItem('userId', userId);
//       }
//     }
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };