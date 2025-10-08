// MessagesPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { useSocket } from '../hooks/useSocket';

/* Error Boundary */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* Default export wraps the page with the ErrorBoundary */
export default function MessagesPageWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <MessagesPage />
    </ErrorBoundary>
  );
}

/* Actual chat page */
function MessagesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket, isConnected, registerUser } = useSocket(); // Use the global socket

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [ownProfile, setOwnProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Helpers for clean storage URLs
  const normalizePath = (p) => String(p || "").replace(/\\/g, "/").replace(/^\/+/, "");
  const appBase = () => {
    const base = API?.defaults?.baseURL || "";
    return base.replace(/\/api\/?$/, "").replace(/\/$/, "");
  };
  const storageUrl = (p) => `${appBase()}/storage/${normalizePath(p)}`;

  // Debugging helper to test Echo connection


// Run WebSocket test after Echo is ready

  // Socket registration
  useEffect(() => {
    if (currentUserId && socket) {
      registerUser(currentUserId.toString());
    }
  }, [currentUserId, socket, registerUser]);

  // ---- Realtime message listener (Pusher/Echo) ----
useEffect(() => {
  if (!window.Echo || !id) return;

  console.log("📞 Subscribing to channel conversation." + id);

  const channel = window.Echo.private(`conversation.${id}`);

  channel.listen(".new-message", (data) => {
    if (!data || !data.message) return;
    console.log("💬 Live message received:", data.message);

    const normalized = normalizeMessageStructure(data.message);
    setMessages((prev) =>
      prev.some((m) => m.id === normalized.id) ? prev : [...prev, normalized]
    );
  });

  channel.subscribed(() =>
    console.log("✅ Subscribed to conversation." + id)
  );

  channel.error((e) => console.error("Socket error:", e));

  return () => {
    console.log("🧹 Unsubscribing from conversation." + id);
    window.Echo.leave(`conversation.${id}`);
  };
}, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // NEW: Function to normalize message structure for consistent handling
  const normalizeMessageStructure = (message) => {
    const normalized = { ...message };
    
    // Ensure attachments is always an array with proper structure
    if (normalized.attachments) {
      if (!Array.isArray(normalized.attachments)) {
        normalized.attachments = [normalized.attachments];
      }
      
      // Process each attachment to ensure it has proper URL
      normalized.attachments = normalized.attachments.map(att => {
        if (typeof att === 'string') {
          return { 
            url: att.startsWith('http') ? att : storageUrl(att), 
            name: 'Attachment',
            type: 'unknown'
          };
        }
        
        // If attachment is object but URL is relative, convert to full URL
        if (att.url && !att.url.startsWith('http') && !att.url.startsWith('blob:')) {
          return {
            ...att,
            url: att.url.startsWith('/storage/') 
              ? `${appBase()}${att.url}`
              : storageUrl(att.url)
          };
        }
        
        return att;
      });
    }
    
    return normalized;
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // UPDATED: Improved fetchConversation with better attachment handling
  async function fetchConversation() {
    try {
      setLoading(true);
     const res = await API.get(`/api/conversations/${id}`);

      if (res.data && typeof res.data === "object") {
        const data = res.data;
        const conv = data.conversation || data;

        setConversation(conv);

        // Robust messages extraction with normalization
        const messagesData = data.messages || data.messagesData || conv.messages || [];
        const processedMessages = Array.isArray(messagesData) 
          ? messagesData.map(msg => normalizeMessageStructure(msg))
          : [];

        setMessages(processedMessages);

        // current user id
        const uid = data.current_user_id || conv.current_user_id || null;

        if (uid != null) {
          setCurrentUserId(uid);
        } else {
          try {
            const u = await API.get("/user");
            if (u?.data?.id) setCurrentUserId(u.data.id);
          } catch {
            // ignore
          }
        }
      }

      // own profile for DP (best-effort)
      try {
        const own = await API.get("/api/profile");
        if (own?.data) {
          setOwnProfile(own.data);
          if (!currentUserId && own.data.user?.id) {
            setCurrentUserId(own.data.user.id);
          }
        }
      } catch {
        // ignore: maybe no profile yet
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      alert("Failed to load conversation");
      setConversation(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) setSelectedFile(file);
  };

  // UPDATED: sendMessage with correct API route
const sendMessage = async () => {
  const text = newMessage.trim();
  if (!text && !selectedFile) return;
  if (sending) return;

  setSending(true);
  const form = new FormData();
  if (text) form.append("body", text);
  if (selectedFile) form.append("attachments[]", selectedFile);

  try {
    // ADD /api/ prefix to the route
    const res = await API.post(`/api/conversations/${id}/messages`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const created = res.data;
    if (created) {
      // Normalize the message structure before adding to state
      const normalizedMessage = normalizeMessageStructure(created);
      setMessages((prev) => [...prev, normalizedMessage]);
    }

    setNewMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (err) {
    console.error("Error sending message:", err);
    alert(
      "Failed to send message: " +
        (err.response?.data?.message || err.message || "Server error")
    );
  } finally {
    setSending(false);
    inputRef.current?.focus();
  }
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const isCurrentUserMessage = (message) => {
    const senderId = message.sender_id || message.sender?.id || message.user_id || message.from_id;
    return Number(senderId) === Number(currentUserId);
  };

  const getAvatarUrlForMessage = (message) => {
    const possible = message.sender?.profile_photo || message.sender?.profile?.profile_photo || 
                    message.sender?.profile_photo_path || message.profile_photo || 
                    (message.sender && message.sender.avatar) || null;

    if (possible) return storageUrl(possible);

    if (isCurrentUserMessage(message) && ownProfile?.profile_photo) {
      return storageUrl(ownProfile.profile_photo);
    }

    return null;
  };

  const isImageFile = (filenameOrPath) => {
    if (!filenameOrPath) return false;
    return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(filenameOrPath);
  };

  const isImageType = (mimeType) => {
    if (!mimeType) return false;
    return mimeType.startsWith('image/');
  };

  const openImage = (url) => setSelectedImage(url);

 const startCall = async (type = "audio") => {
    if (!otherParticipant) {
        alert("Cannot make call. Other participant not found.");
        return;
    }

    const currentUserIdStr = currentUserId.toString();
    const otherUserIdStr = otherParticipant.id.toString();
    
    // Store IDs in localStorage
    localStorage.setItem("userId", currentUserIdStr);
    localStorage.setItem("remoteUserId", otherUserIdStr);
    
    try {
        // Use API call to initiate call
        await API.post(`/call/initiate`, {
            to: otherUserIdStr,
            from: currentUserIdStr,
            fromName: ownProfile?.user?.name || "User",
            type: type,
            conversationId: id,
        });
        
        navigate(`/call/${id}?type=${type}&initiator=true`);
    } catch (error) {
        console.error('Call initiation error:', error);
        alert("Cannot make call. Please check your connection.");
    }
};

const acceptCall = () => {
    if (!incomingCall) {
        alert("No incoming call to accept.");
        return;
    }

    // Store both user IDs in localStorage
    localStorage.setItem('userId', currentUserId);
    localStorage.setItem('remoteUserId', incomingCall.from);
    
    // Navigate to call page
    navigate(`/call/${id}?type=${incomingCall.type}&initiator=false`);
    
    setCallModalOpen(false);
    setIncomingCall(null);
};

const rejectCall = () => {
    if (!incomingCall) return;
    
    // For now, just close the modal
    // In a real app, you'd send a rejection via API
    setCallModalOpen(false);
    setIncomingCall(null);
    console.log('Call rejected');
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Conversation not found
          </h2>
          <p className="text-gray-600">
            This conversation may have been deleted or you don't have access to it.
          </p>
        </div>
      </div>
    );
  }

  const otherParticipant = conversation.participants?.find(
    (p) => Number(p.id) !== Number(currentUserId)
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            {otherParticipant?.profile?.profile_photo ? (
              <img
                src={storageUrl(otherParticipant.profile.profile_photo)}
                alt="dp"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-lg">
                {otherParticipant?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {otherParticipant?.name || "Unknown User"}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
              <span className={`ml-2 w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="ml-1 text-xs">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => startCall("audio")}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
            title="Start audio call"
            disabled={!isConnected}
          >
            📞
          </button>
          <button
            onClick={() => startCall("video")}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
            title="Start video call"
            disabled={!isConnected}
          >
            🎥
          </button>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => {
            const isOwn = isCurrentUserMessage(message);
            const avatar = getAvatarUrlForMessage(message);

            return (
              <div key={message.id} className="w-full">
                <div
                  className={`flex w-full ${
                    isOwn ? "justify-end" : "justify-start"
                  } items-end`}
                >
                  {!isOwn && (
                    <div className="flex-shrink-0 w-10 mr-3">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                          {message.sender?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`max-w-xs md:max-w-lg ${
                      isOwn ? "text-right" : "text-left"
                    }`}
                  >
                    {!isOwn && message.sender?.name && (
                      <div className="text-xs text-gray-500 mb-1">
                        {message.sender.name}
                      </div>
                    )}

                    <div
                      className={`${
                        isOwn
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                      } inline-block px-4 py-2 rounded-2xl shadow-sm`}
                    >
                      {message.body && (
                        <div className="whitespace-pre-wrap break-words text-sm">
                          {message.body}
                        </div>
                      )}

                      {/* UPDATED: Unified attachments handling */}
                      {message.attachments && Array.isArray(message.attachments) && message.attachments.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                          {message.attachments.map((attachment, idx) => {
                            // Handle both string and object formats
                            const att = typeof attachment === 'string' 
                              ? { url: attachment, name: 'Attachment' } 
                              : attachment;
                            
                            // Use the URL directly (it should already be full URL from backend)
                            const attachmentUrl = att.url || att;
                            
                            // Check if it's an image
                            const isImage = isImageType(att.type) || isImageFile(attachmentUrl);

                            return isImage ? (
                              <img
                                key={idx}
                                src={attachmentUrl}
                                className="w-full h-24 object-cover rounded cursor-pointer"
                                onClick={() => openImage(attachmentUrl)}
                                alt={att.name || "Attachment"}
                                onError={(e) => {
                                  // Hide failed image and show fallback
                                  e.target.style.display = "none";
                                  const fallback = e.target.nextSibling;
                                  if (fallback) {
                                    fallback.style.display = "flex";
                                  }
                                }}
                              />
                            ) : (
                              <a
                                key={idx}
                                className="text-blue-600 underline flex items-center p-2 bg-gray-100 rounded"
                                href={attachmentUrl}
                                target="_blank"
                                rel="noreferrer"
                                download={att.name || true}
                              >
                                <span className="mr-2">📄</span>
                                {att.name || "Download file"}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        isOwn ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.created_at)}
                    </div>
                  </div>

                  {isOwn && (
                    <div className="flex-shrink-0 w-10 ml-3">
                      {ownProfile?.profile_photo ? (
                        <img
                          src={storageUrl(ownProfile.profile_photo)}
                          alt="my avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                          {ownProfile?.user?.name?.charAt(0)?.toUpperCase() || "Me"}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No messages yet
            </h3>
            <p className="text-gray-500">
              Start the conversation by sending a message below.
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-3">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleFileClick}
            title="Attach file"
          >
            📎
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 text-sm"
              style={{ minHeight: "44px" }}
              disabled={sending}
            />
            {selectedFile && (
              <div className="absolute -top-10 left-0 bg-white border rounded px-3 py-1 text-xs shadow">
                Attached: {selectedFile.name}
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="ml-2 text-red-500"
                  type="button"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <button
            onClick={sendMessage}
            disabled={(!newMessage.trim() && !selectedFile) || sending}
            className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${
              (newMessage.trim() || selectedFile) && !sending
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {sending ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-full max-h-full rounded shadow-lg"
          />
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Call modal */}
      {callModalOpen && incomingCall && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Incoming Call</h3>
            <p className="text-gray-600 mb-4">
              {incomingCall.fromName} is calling you...
            </p>
            <div className="flex justify-between">
              <button
                onClick={rejectCall}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Reject
              </button>
              <button
                onClick={acceptCall}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}