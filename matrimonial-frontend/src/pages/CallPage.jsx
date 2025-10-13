import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useSignalingSocket } from '../hooks/useSignalingSocket';


export default function CallPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
 const { socket, isConnected, registerUser } = useSignalingSocket();


  const type = searchParams.get('type') || 'video';
  const isInitiator = searchParams.get('initiator') === 'true';

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [callStatus, setCallStatus] = useState(isInitiator ? 'calling' : 'ringing');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const [remoteUserId, setRemoteUserId] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [storedIceCandidates, setStoredIceCandidates] = useState([]);
  const [actualMediaType, setActualMediaType] = useState(type); // Track actual media type after fallback

  // Helpers to get persisted IDs
  const getCurrentUserId = useCallback(() => {
    return localStorage.getItem('userId') || 'unknown';
  }, []);

  const getRemoteUserId = useCallback(() => {
    const fromParams = searchParams.get('remoteUserId');
    return fromParams || localStorage.getItem('remoteUserId') || null;
  }, [searchParams]);

  useEffect(() => {
    console.log('Current User ID from storage:', localStorage.getItem('userId'));
    console.log('Remote User ID from storage:', localStorage.getItem('remoteUserId'));
  }, []);

  const endCall = useCallback(() => {
    try {
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      if (peerConnection) peerConnection.close();
    } catch (e) {
      console.error('Cleanup error:', e);
    }
    navigate(`/messages/${id}`);
  }, [id, navigate, localStream, peerConnection]);

  const handleCallRejected = useCallback(() => {
    setCallStatus('rejected');
    setTimeout(() => endCall(), 2000);
  }, [endCall]);

  const handleCallAccepted = useCallback(() => {
    setCallStatus('connected');
  }, []);

  const handleIceCandidate = useCallback(async (data) => {
    if (!peerConnection || !data?.candidate) {
      // Store ICE candidates if peer connection isn't ready yet
      if (data?.candidate) {
        setStoredIceCandidates(prev => [...prev, data.candidate]);
      }
      return;
    }
    
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (error) {
      console.error('Error adding ice candidate:', error);
    }
  }, [peerConnection]);

  const handleAnswer = useCallback(async (data) => {
    if (!peerConnection || !data?.answer) return;
    try {
      const remoteDesc = new RTCSessionDescription(data.answer);
      await peerConnection.setRemoteDescription(remoteDesc);
      setCallStatus('connected');
    } catch (error) {
      console.error('Error setting remote description (answer):', error);
    }
  }, [peerConnection]);

  const handleOffer = useCallback(async (data) => {
    console.log('🔄 handleOffer called with data:', data);
    
    if (!data?.offer) {
      console.error('❌ No offer in data');
      return;
    }
    
    try {
      // Ensure we know who to answer
      if (!remoteUserId && data.from) {
        console.log('📝 Setting remoteUserId from offer:', data.from);
        setRemoteUserId(String(data.from));
        localStorage.setItem('remoteUserId', String(data.from));
      }

      // If peer connection isn't ready yet, wait for it
      if (!peerConnection) {
        console.log('⏳ Peer connection not ready, retrying in 100ms');
        setTimeout(() => handleOffer(data), 100);
        return;
      }

      console.log('🔧 Setting remote description');
      const remoteDesc = new RTCSessionDescription(data.offer);
      await peerConnection.setRemoteDescription(remoteDesc);
      console.log('✅ Remote description set');

      console.log('🔧 Creating answer');
      const answer = await peerConnection.createAnswer();
      console.log('✅ Answer created:', answer.type);
      
      console.log('🔧 Setting local description');
      await peerConnection.setLocalDescription(answer);
      console.log('✅ Local description set');

      if (socket) {
        console.log('📤 Sending answer to:', data.from);
        socket.emit('answer', {
          to: String(data.from),
          answer,
          from: getCurrentUserId()
        });
        console.log('✅ Answer sent successfully');
      } else {
        console.error('❌ Socket not available');
      }
      
      setCallStatus('connecting');
    } catch (error) {
      console.error('❌ Error handling offer:', error);
      console.error('Error details:', error.message, error.stack);
      setCallStatus('failed');
    }
  }, [peerConnection, socket, remoteUserId, getCurrentUserId]);

  // Process stored ICE candidates when peer connection is ready
  useEffect(() => {
    if (peerConnection && storedIceCandidates.length > 0) {
      storedIceCandidates.forEach(candidate => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
          .catch(error => console.error('Error adding stored ICE candidate:', error));
      });
      setStoredIceCandidates([]);
    }
  }, [peerConnection, storedIceCandidates]);

  // Create/get media + RTCPeerConnection
  const initializeCall = useCallback(async () => {
    try {
      console.log('🎯 initializeCall called - isInitiator:', isInitiator);
      
      let stream;
      let mediaType = type; // Use local variable instead of modifying const
      
      try {
        // Try to get media with video first
        stream = await navigator.mediaDevices.getUserMedia({
          video: mediaType === 'video',
          audio: true,
        });
      } catch (mediaError) {
        console.error('❌ Media access failed:', mediaError);
        
        if (mediaType === 'video') {
          // If video fails, try audio only
          console.log('🔄 Falling back to audio only');
          stream = await navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
          });
          // Update the media type since we're falling back to audio
          mediaType = 'audio';
          setActualMediaType('audio');
        } else {
          throw mediaError; // Re-throw if audio also fails
        }
      }
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
      });
      setPeerConnection(pc);
      console.log('🎯 PeerConnection created');

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        console.log('🎯 Remote track received');
        if (event.streams && event.streams[0]) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            setCallStatus('connected');
            console.log('🎯 Call connected!');
          }
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && socket && remoteUserId) {
          console.log('🎯 Sending ICE candidate');
          socket.emit('ice-candidate', {
            to: String(remoteUserId),
            candidate: event.candidate,
            from: getCurrentUserId()
          });
        }
      };

      pc.onconnectionstatechange = () => {
        console.log('🎯 Connection state:', pc.connectionState);
        if (pc.connectionState === 'connected') setCallStatus('connected');
        if (['disconnected', 'failed', 'closed'].includes(pc.connectionState)) {
          setCallStatus('failed');
          setTimeout(() => endCall(), 2000);
        }
      };

      // If initiator, send offer
      if (isInitiator && socket && remoteUserId) {
        console.log('🎯 Creating offer as initiator');
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { 
          to: String(remoteUserId), 
          offer, 
          from: getCurrentUserId() 
        });
        setCallStatus('connecting');
      } else {
        console.log('🎯 Ready as callee, waiting for offer');
      }
    } catch (error) {
      console.error('❌ Error initializing call:', error);
      
      // Specific error handling
      if (error.name === 'NotAllowedError') {
        alert('Please allow camera and microphone access to make calls');
      } else if (error.name === 'NotFoundError') {
        alert('No camera/microphone found. Please check your devices.');
      } else if (error.name === 'NotReadableError') {
        alert('Camera/microphone is already in use by another application.');
      }
      
      setCallStatus('failed');
    }
  }, [type, isInitiator, socket, remoteUserId, endCall, getCurrentUserId]);

  // Set up socket event listeners
useEffect(() => {
  if (!socket || typeof socket.on !== 'function') {
    console.warn('⚠️ Socket not ready or invalid in CallPage');
    return;
  }

  console.log('🎯 Socket event listeners attached for CallPage');

  socket.on('offer', handleOffer);
  socket.on('answer', handleAnswer);
  socket.on('ice-candidate', handleIceCandidate);
  socket.on('call-rejected', handleCallRejected);
  socket.on('call-accepted', handleCallAccepted);
  socket.on('incoming-call', (data) => {
    console.log('📞 Incoming call data:', data);
    setIncomingCall(data);
    setCallStatus('ringing');
  });
  socket.on('call-failed', (data) => {
    console.error('❌ Call failed:', data.reason);
    setCallStatus('failed');
  });

  return () => {
    console.log('🧹 Cleaning up CallPage socket listeners');
    socket.off('offer');
    socket.off('answer');
    socket.off('ice-candidate');
    socket.off('call-rejected');
    socket.off('call-accepted');
    socket.off('incoming-call');
    socket.off('call-failed');
  };
}, [socket, handleOffer, handleAnswer, handleIceCandidate, handleCallRejected, handleCallAccepted]);


  // Initialize call and set remote user ID
  useEffect(() => {
    const remoteId = getRemoteUserId();
    if (remoteId) {
      setRemoteUserId(remoteId);
      console.log('Remote user ID:', remoteId);
    }

    if (isInitiator && socket && isConnected) {
      initializeCall();
    }
  }, [getRemoteUserId, isInitiator, socket, isConnected, initializeCall]);

useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (userId && registerUser) {
    registerUser(userId);
  }
}, [registerUser]);


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (peerConnection) peerConnection.close();
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
    };
  }, [peerConnection, localStream]);

  // Debug WebRTC states
  useEffect(() => {
    if (peerConnection) {
      const logState = () => {
        console.log('WebRTC State - ICE:', peerConnection.iceConnectionState, 
                   'Signaling:', peerConnection.signalingState,
                   'Connection:', peerConnection.connectionState);
      };
      
      peerConnection.addEventListener('iceconnectionstatechange', logState);
      peerConnection.addEventListener('signalingstatechange', logState);
      peerConnection.addEventListener('connectionstatechange', logState);
      
      return () => {
        peerConnection.removeEventListener('iceconnectionstatechange', logState);
        peerConnection.removeEventListener('signalingstatechange', logState);
        peerConnection.removeEventListener('connectionstatechange', logState);
      };
    }
  }, [peerConnection]);

  // Add this useEffect to debug socket events
  useEffect(() => {
    if (socket) {
      console.log('🎯 Socket event listeners setup');
      
      // Debug when offer is received
      socket.on('offer', (data) => {
        console.log('🎯 OFFER RECEIVED:', data);
        handleOffer(data);
      });
      
      // Debug all socket events
      const originalEmit = socket.emit;
      socket.emit = function(event, data) {
        console.log('🎯 EMITTING:', event, data);
        return originalEmit.call(this, event, data);
      };
      
      return () => {
        socket.off('offer');
      };
    }
  }, [socket, handleOffer]);

  // Debug user IDs and connection status
  useEffect(() => {
    console.log('🔍 DEBUG - Current User ID:', localStorage.getItem('userId'));
    console.log('🔍 DEBUG - Remote User ID:', localStorage.getItem('remoteUserId'));
    console.log('🔍 DEBUG - Socket connected:', isConnected);
    console.log('🔍 DEBUG - Socket ID:', socket?.id);
  }, [socket, isConnected]);

  const toggleMute = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setIsMuted((v) => !v);
  };

  const toggleVideo = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setIsVideoOff((v) => !v);
  };

  const acceptCall = () => {
    if (socket && incomingCall && isConnected) {
      setRemoteUserId(String(incomingCall.from));
      localStorage.setItem('remoteUserId', String(incomingCall.from));
      
      socket.emit('call-accepted', { to: incomingCall.from });
      setCallStatus('connecting');
      initializeCall();
    }
  };

  const rejectCall = () => {
    if (socket && incomingCall && isConnected) {
      socket.emit('call-rejected', { to: incomingCall.from });
    }
    endCall();
  };

  const debugConnection = () => {
    console.log('=== DEBUG INFO ===');
    console.log('Current User ID:', getCurrentUserId());
    console.log('Remote User ID:', remoteUserId);
    console.log('Socket connected:', isConnected);
    console.log('Peer connection state:', peerConnection?.connectionState);
    console.log('Call status:', callStatus);
    console.log('Is initiator:', isInitiator);
    console.log('Call type:', type);
    console.log('Actual media type:', actualMediaType);
    if (peerConnection) {
      console.log('Local description:', peerConnection.localDescription);
      console.log('Remote description:', peerConnection.remoteDescription);
      console.log('Signaling state:', peerConnection.signalingState);
      console.log('ICE connection state:', peerConnection.iceConnectionState);
    }
  };

  const manualDebug = () => {
    console.log('🔄 Manual debug - PeerConnection:', peerConnection);
    console.log('🔄 Manual debug - RemoteUserId:', remoteUserId);
    console.log('🔄 Manual debug - Socket:', socket?.id);
    console.log('🔄 Manual debug - LocalStream:', localStream);
    console.log('🔄 Manual debug - ActualMediaType:', actualMediaType);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 w-1/4 h-1/4 bg-gray-800 rounded-lg overflow-hidden">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white`}
          >
            {isMuted ? '🔇' : '🎤'}
          </button>
          {actualMediaType === 'video' && (
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} text-white`}
            >
              {isVideoOff ? '📷 off' : '📷 on'}
            </button>
          )}
          <button onClick={endCall} className="p-3 rounded-full bg-red-500 text-white">📞 End</button>
          <button onClick={debugConnection} className="p-3 rounded-full bg-blue-500 text-white">
            Debug
          </button>
          <button 
            onClick={manualDebug}
            className="p-3 rounded-full bg-yellow-500 text-white"
          >
            🐛 Debug
          </button>
        </div>

        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
          {callStatus === 'calling' && 'Calling...'}
          {callStatus === 'ringing' && 'Ringing...'}
          {callStatus === 'connecting' && 'Connecting...'}
          {callStatus === 'connected' && 'Connected'}
          {callStatus === 'failed' && 'Connection Failed'}
          {callStatus === 'rejected' && 'Call Rejected'}
          {actualMediaType !== type && ` (${actualMediaType} only)`}
        </div>

        {callStatus === 'ringing' && incomingCall && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Incoming {incomingCall.type} Call</h2>
              <p className="mb-4">From: {incomingCall.fromName}</p>
              <div className="flex space-x-4">
                <button onClick={acceptCall} className="px-4 py-2 bg-green-500 text-white rounded">
                  Accept
                </button>
                <button onClick={rejectCall} className="px-4 py-2 bg-red-500 text-white rounded">
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}