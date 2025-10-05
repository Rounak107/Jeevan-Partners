import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { setToken } from "../auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // ADD /api/ prefix to the login route
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
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white" 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
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
      </form>
    </div>
  );
}