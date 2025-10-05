// signaling-server.mjs
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Store user connections - map user IDs to socket IDs
const userSocketMap = new Map();
// Store socket IDs to user IDs for reverse lookup
const socketUserMap = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Handle user registration
  socket.on('register', (userId) => {
    console.log(`User ${userId} registered with socket ${socket.id}`);
    
    // Convert to string to ensure consistent type comparison
    const userIdStr = userId.toString();
    
    // Remove any existing registration for this user
    if (userSocketMap.has(userIdStr)) {
      const oldSocketId = userSocketMap.get(userIdStr);
      console.log(`Removing old registration for user ${userIdStr}`);
      userSocketMap.delete(userIdStr);
      socketUserMap.delete(oldSocketId);
      
      // Notify old socket it's being replaced
      if (io.sockets.sockets.has(oldSocketId)) {
        io.to(oldSocketId).emit('connection-replaced');
      }
    }
    
    // Add new registration
    userSocketMap.set(userIdStr, socket.id);
    socketUserMap.set(socket.id, userIdStr);
    
    console.log('Current user mappings:', Array.from(userSocketMap.entries()));
    socket.emit('registered', { success: true, userId: userIdStr });
  });
  
  // Handle call initiation with better error handling
  socket.on('initiate-call', (data) => {
    console.log('Initiating call from', data.from, 'to', data.to);
    const targetSocketId = userSocketMap.get(data.to.toString());
    
    if (targetSocketId) {
      console.log('Sending call to socket:', targetSocketId);
      io.to(targetSocketId).emit('incoming-call', {
        from: data.from,
        fromName: data.fromName,
        type: data.type,
        conversationId: data.conversationId
      });
      
      // Confirm to caller that call was initiated
      socket.emit('call-initiated', { to: data.to });
    } else {
      console.log('Target user not found:', data.to);
      console.log('Current user mappings:', Array.from(userSocketMap.entries()));
      // Notify caller that target is not available
      socket.emit('call-failed', { 
        reason: 'User not available',
        targetUserId: data.to
      });
    }
  });
  
// Add this to better debug the flow
console.log('Current user mappings:', Array.from(userSocketMap.entries()));

  // Handle WebRTC signaling
  socket.on('offer', (data) => {
     console.log('OFFER: From', data.from, 'To', data.to, 'Socket:', userSocketMap.get(data.to.toString()));
  console.log('Forwarding offer from', data.from, 'to', data.to);
  const targetSocketId = userSocketMap.get(data.to.toString());
  if (targetSocketId) {
    io.to(targetSocketId).emit('offer', {
      offer: data.offer,
      from: data.from // Make sure to include this
    });
  }
});

socket.on('answer', (data) => {
  console.log('ANSWER: From', data.from, 'To', data.to, 'Socket:', userSocketMap.get(data.to.toString()));
  const targetSocketId = userSocketMap.get(data.to.toString());
  if (targetSocketId) {
    console.log('📨 Forwarding answer to socket:', targetSocketId);
    io.to(targetSocketId).emit('answer', {
      answer: data.answer,
      from: data.from
    });
  } else {
    console.error('❌ Target user not found for answer:', data.to);
  }
});
  
  socket.on('ice-candidate', (data) => {
    console.log('ICE: From', data.from, 'To', data.to, 'Socket:', userSocketMap.get(data.to.toString()));
  console.log('Forwarding ICE candidate from', data.from, 'to', data.to);
  const targetSocketId = userSocketMap.get(data.to.toString());
  if (targetSocketId) {
    io.to(targetSocketId).emit('ice-candidate', {
      candidate: data.candidate,
      from: data.from // Make sure to include this
    });
  }
});
  
  // Handle call rejection
  socket.on('call-rejected', (data) => {
    console.log('Call rejected by', socket.id, 'for', data.to);
    const targetSocketId = userSocketMap.get(data.to.toString());
    if (targetSocketId) {
      io.to(targetSocketId).emit('call-rejected');
    }
  });
  
  // Handle call acceptance
  socket.on('call-accepted', (data) => {
    console.log('Call accepted by', socket.id, 'for', data.to);
    const targetSocketId = userSocketMap.get(data.to.toString());
    if (targetSocketId) {
      io.to(targetSocketId).emit('call-accepted');
    }
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from mapping
    const userId = socketUserMap.get(socket.id);
    if (userId) {
      userSocketMap.delete(userId);
      socketUserMap.delete(socket.id);
      console.log(`Removed user ${userId} from mapping`);
    }
  });
  
  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});