import React, { useState, useEffect } from "react";
import API from "../api";

export default function LikeButton({ profileId, initialLiked = false, initialCount = 0 }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  useEffect(() => setLiked(initialLiked), [initialLiked]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    try {
      // Backend toggle accepts either a profile ID or a user ID.
      // Pass profileId = profile.id to avoid ambiguity.
      const res = await API.post(`/api/profiles/${profileId}/like`);
      const nowLiked = !!res.data.liked;
      setLiked(nowLiked);
      setCount((prev) => (nowLiked ? prev + 1 : Math.max(prev - 1, 0)));
    } catch (e) {
      console.error(e);
      alert("Could not perform action");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={toggle}
        disabled={busy}
        aria-pressed={liked}
        className={`px-3 py-1.5 rounded ${
          liked ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-700 hover:bg-gray-600"
        } text-white disabled:opacity-60`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <small className="text-gray-300">{count}</small>
    </div>
  );
}