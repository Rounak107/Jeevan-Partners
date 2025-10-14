// src/pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");
  const email = params.get("email") || "";
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
        // Remove /api prefix since baseURL already includes it
        const res = await API.post("/reset-password", {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });

        setMessage(res.data.message || "Password reset successfully.");
        setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to reset password.");
    } finally {
        setLoading(false);
    }
}

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      {message && <div className="bg-green-600 text-white p-2 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-600 text-white p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Email"
          type="email"
          value={email}
          readOnly
        />

        <input
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <button
          className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 disabled:opacity-50 text-white w-full"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
