// src/hooks/useSignalingSocket.js
import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

export const useSignalingSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 👇 use your deployed signaling server URL (replace localhost)
    const socketInstance = io("https://couplemarriage.com:3001", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected to signaling server", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from signaling server");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const registerUser = useCallback(
    (userId) => {
      if (socket && isConnected) {
        console.log("👤 Registering user with signaling server:", userId);
        socket.emit("register", userId);
      } else {
        console.warn("⚠️ Socket not connected yet");
      }
    },
    [socket, isConnected]
  );

  return { socket, isConnected, registerUser };
};
