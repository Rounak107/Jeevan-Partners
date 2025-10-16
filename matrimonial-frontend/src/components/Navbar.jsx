import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../auth";
import { MessageSquare, Heart, Users, User, Crown, LogOut, Menu, X, Sparkles } from "lucide-react";
import API from "../api";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Subtle scroll effect for navbar elegance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const navLinkClass = (path, exact = false) => {
    const isActive = exact 
      ? location.pathname === path 
      : location.pathname.startsWith(path);
    
    return `relative px-5 py-2.5 rounded-full font-medium transition-all duration-500 group overflow-hidden ${
      isActive
        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md"
        : "text-rose-900/70 hover:text-rose-700"
    }`;
  };

  useEffect(() => {
    async function fetchUnread() {
      try {
        const res = await API.get("/api/unread-messages-count");
        setUnreadCount(res.data.count || 0);
      } catch {
        setUnreadCount(0);
      }
    }

    if (isLoggedIn()) {
      fetchUnread();
      const interval = setInterval(fetchUnread, 15000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      {/* Elegant Navbar with Wedding Theme */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-rose-100' 
          : 'bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50/30'
      }`}>
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Elegant Logo with Wedding Motif */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-all duration-500 hover:scale-105"
            >
              {/* Logo Container with Romantic Animation */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src="https://www.couplemarriage.com/logo__Couple_Marriage.png"
                    alt="Couple Marriage Logo" 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:rotate-12 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
                  {/* Fallback with Hearts */}
                  <div className="hidden">
                    <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
                  </div>
                </div>
                {/* Floating Sparkles */}
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              
              {/* Brand Name with Elegant Typography */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Couple Marriage
                </span>
                <span className="text-[10px] sm:text-xs text-rose-400 font-light tracking-widest -mt-1">
                  FIND YOUR SOULMATE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Elegant & Spacious */}
            <nav className="hidden lg:flex items-center gap-2">
              {isLoggedIn() ? (
                <>
                  {/* Matches Link */}
                  <Link to="/matches" className={navLinkClass("/matches", true)}>
                    <span className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">Matches</span>
                    </span>
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-200/50 to-pink-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-0 group-hover:scale-100"></div>
                  </Link>
                  
                  {/* My Likes Link */}
                  <Link to="/likes" className={navLinkClass("/likes", true)}>
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">My Likes</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-rose-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-0 group-hover:scale-100"></div>
                  </Link>
                  
                  {/* Profile Link */}
                  <Link to="/profile/me" className={navLinkClass("/profile")}>
                    <span className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span className="font-semibold">My Profile</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-pink-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-0 group-hover:scale-100"></div>
                  </Link>
                  
                  {/* Membership Link - Premium Look */}
                  <Link to="/membership" className={navLinkClass("/membership", true)}>
                    <span className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        Premium
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-0 group-hover:scale-100"></div>
                  </Link>
                  
                  {/* Messages Link with Badge */}
                  <Link to="/messages" className={navLinkClass("/messages")}>
                    <span className="flex items-center gap-2 relative">
                      <div className="relative">
                        <MessageSquare className="w-5 h-5" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-2 -right-2 flex h-5 w-5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-bold shadow-lg">
                              {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                          </span>
                        )}
                      </div>
                      <span className="font-semibold">Messages</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-200/50 to-purple-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 scale-0 group-hover:scale-100"></div>
                  </Link>

                  {/* Elegant Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="ml-3 relative px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden group"
                  >
                    <span className="relative flex items-center gap-2 z-10">
                      <LogOut className="w-5 h-5" />
                      Logout
                    </span>
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </>
              ) : (
                <>
                  {/* Login Button */}
                  <Link
                    to="/login"
                    className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-500 ${
                      location.pathname === "/login"
                        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md"
                        : "text-rose-700 hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-300"
                    }`}
                  >
                    Login
                  </Link>
                  
                  {/* Register Button - Call to Action */}
                  <Link
                    to="/register"
                    className="ml-2 relative px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-white animate-pulse" />
                      Register
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button - Elegant */}
            <button
              className="lg:hidden p-2.5 rounded-full transition-all duration-300 text-rose-600 hover:bg-rose-100 border-2 border-transparent hover:border-rose-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation - Elegant Slide Down */}
          <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
            isMenuOpen ? 'max-h-[600px] opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}>
            <nav className="pt-2 pb-4 space-y-2">
              {isLoggedIn() ? (
                <>
                  <Link
                    to="/matches"
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 ${
                      location.pathname === "/matches"
                        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md transform scale-105"
                        : "text-rose-900/70 hover:bg-rose-50/50 hover:text-rose-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`p-2 rounded-xl ${location.pathname === "/matches" ? "bg-white shadow-sm" : "bg-rose-50"}`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Matches</span>
                  </Link>
                  
                  <Link
                    to="/likes"
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 ${
                      location.pathname === "/likes"
                        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md transform scale-105"
                        : "text-rose-900/70 hover:bg-rose-50/50 hover:text-rose-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`p-2 rounded-xl ${location.pathname === "/likes" ? "bg-white shadow-sm" : "bg-rose-50"}`}>
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">My Likes</span>
                  </Link>
                  
                  <Link
                    to="/profile/me"
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 ${
                      location.pathname.startsWith("/profile")
                        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md transform scale-105"
                        : "text-rose-900/70 hover:bg-rose-50/50 hover:text-rose-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`p-2 rounded-xl ${location.pathname.startsWith("/profile") ? "bg-white shadow-sm" : "bg-rose-50"}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">My Profile</span>
                  </Link>

                  <Link
                    to="/membership"
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 ${
                      location.pathname === "/membership"
                        ? "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 shadow-md transform scale-105"
                        : "text-rose-900/70 hover:bg-amber-50/30 hover:text-amber-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`p-2 rounded-xl ${location.pathname === "/membership" ? "bg-white shadow-sm" : "bg-amber-50"}`}>
                      <Crown className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="font-semibold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                      Premium Membership
                    </span>
                  </Link>
                  
                  <Link
                    to="/messages"
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-500 ${
                      location.pathname.startsWith("/messages")
                        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md transform scale-105"
                        : "text-rose-900/70 hover:bg-rose-50/50 hover:text-rose-700"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className={`p-2 rounded-xl relative ${location.pathname.startsWith("/messages") ? "bg-white shadow-sm" : "bg-rose-50"}`}>
                      <MessageSquare className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-bold">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        </span>
                      )}
                    </div>
                    <span className="font-semibold">Messages</span>
                    {unreadCount > 0 && (
                      <span className="ml-auto bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </Link>

                  {/* Elegant Logout Button Mobile */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-5 py-3.5 rounded-2xl hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-500 font-semibold shadow-lg mt-4"
                  >
                    <div className="p-2 bg-white/20 rounded-xl">
                      <LogOut className="w-5 h-5" />
                    </div>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`flex items-center justify-center px-5 py-3.5 rounded-2xl transition-all duration-500 font-semibold ${
                      location.pathname === "/login"
                        ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-md"
                        : "text-rose-700 border-2 border-rose-200 hover:bg-rose-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login to Your Account
                  </Link>
                  
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-5 py-3.5 rounded-2xl hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-500 font-semibold shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    Register for Free
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
      </header>
      
      {/* Spacer with subtle gradient transition */}
      {/* <div className="h-20 bg-gradient-to-b from-rose-50/30 to-transparent"></div> */}
    </>
  );
}