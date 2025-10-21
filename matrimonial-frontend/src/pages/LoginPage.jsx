import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { setToken } from "../auth";

// You may use a wedding-related background image or floral SVGs.
// Replace the image URL below with your own hosted asset if required.
const bgStyle = {
  background: 'linear-gradient(135deg, #ffecec 0%, #fff7fb 100%)',
  minHeight: '100vh',
  backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1000&q=80")', // optional wedding bg image
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

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
    <div style={bgStyle}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-75 bg-pink-50">
        {/* Wedding icon/logo */}
        <div className="mb-6">
          <span className="inline-block rounded-full bg-white shadow-lg p-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <ellipse cx="24" cy="24" rx="20" ry="18" fill="#FEF3F5"/>
              <path d="M14 30c4-10 16-10 20 0" stroke="#F783AC" strokeWidth="3" fill="none" />
              <path d="M16 20a6 6 0 1 1 12 0" stroke="#F783AC" strokeWidth="2" fill="none"/>
              <circle cx="24" cy="20" r="4" fill="#F783AC"/>
            </svg>
          </span>
        </div>

        <div className="max-w-sm w-full bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 border border-pink-100 relative">
          <div className="absolute -left-6 -top-6">
            {/* Decorative floral or heart SVG */}
            <svg width="60" height="60" fill="none">
              <path d="M30 10c5 0 8 6 8 8s-4 8-8 10c-4-2-8-8-8-10s3-8 8-8z" fill="#FFD6E0"/>
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-pink-700 text-center font-serif">Wedding Login</h2>
          <p className="text-center text-sm text-pink-500 mb-6">
            Welcome to the beginning of your forever. Please login to continue!
          </p>

          {error && <div className="bg-pink-200 text-pink-800 p-2 rounded mb-4 border border-pink-300">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              className="w-full p-3 rounded-xl border border-pink-200 text-pink-700 font-medium bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-300"
              placeholder="Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                className="w-full p-3 rounded-xl border border-pink-200 text-pink-700 bg-pink-50 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder:text-pink-300 font-medium"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-pink-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle Show Password"
              >
                {showPassword ? "💞" : "👁️"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-pink-500 px-6 py-2 rounded-full text-white font-semibold shadow-md hover:bg-pink-400 transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in…" : "Login"}
              </button>

              <Link to="/register" className="text-pink-400 underline hover:text-pink-500 font-medium">
                Register
              </Link>
            </div>

            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-pink-300 hover:text-pink-400 underline">
                Forgot Password?
              </Link>
            </div>
          </form>

          {/* Footer wedding quote */}
          <div className="mt-8 text-center text-xs text-pink-500 font-serif italic">
            "Two hearts, one login, endless possibilities."
          </div>
        </div>
      </div>
    </div>
  );
}
