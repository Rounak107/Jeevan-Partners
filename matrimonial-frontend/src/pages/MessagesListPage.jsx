import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function MessagesListPage() {
  const [conversations, setConversations] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      const res = await API.get("/api/conversations");
      setConversations(res.data.conversations || []);
      setCurrentUserId(res.data.current_user_id);
    } catch (err) {
      console.error("❌ Failed to load conversations:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading messages...</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <div className="text-5xl mb-4">💬</div>
        <p>No conversations yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Messages</h1>

      <div className="grid gap-4">
        {conversations.map((conv) => {
          const other = conv.participants?.find((p) => p.id !== currentUserId);
          const lastMessage = conv.latest_message || conv.latestMessage;

          return (
            <div
              key={conv.id}
              onClick={() => navigate(`/messages/${conv.id}`)}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    other?.profile?.profile_photo
                      ? `${API.defaults.baseURL.replace("/api", "")}/storage/${other.profile.profile_photo}`
                      : "https://via.placeholder.com/48"
                  }
                  alt={other?.name || "User"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{other?.name || "Unknown User"}</p>
                  <p className="text-sm text-gray-600 truncate w-56">
                    {lastMessage?.body || "📎 Attachment"}
                  </p>
                </div>
              </div>

              {lastMessage?.read_at === null && (
                <span className="bg-rose-500 text-white text-xs px-3 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
