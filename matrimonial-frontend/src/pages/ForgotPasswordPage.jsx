// src/pages/ForgotPasswordPage.jsx
import React, { useState } from "react";
import API from "../api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();
  setMessage("");
  setError("");
  setLoading(true);

  try {
    // ✅ Important: ensure CSRF token is set before posting
    await API.get("/sanctum/csrf-cookie");

    const res = await API.post("/api/forgot-password", { email });
    setMessage(res.data.message || "Password reset link has been sent to your email.");
  } catch (err) {
    console.error(err);
    setError(err?.response?.data?.message || "Failed to send reset link.");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>

      {message && <div className="bg-green-600 text-white p-2 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-600 text-white p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Enter your registered email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 disabled:opacity-50 text-white w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
