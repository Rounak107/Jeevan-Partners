// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { setToken } from "../auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/api/login", { email, password });
      setToken(res.data.access_token);
      navigate("/matches");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>
      {error && <div className="bg-red-600 text-white p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white pr-10"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 disabled:opacity-50 text-white"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Register
          </Link>
        </div>

        <div className="text-right mt-2">
          <Link to="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
