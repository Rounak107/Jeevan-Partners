import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../auth";
import { 
  Heart, 
  MessageCircle, 
  Shield, 
  Users, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Star,
  Crown,
  Smartphone,
  X,
  Zap,
  Award,
  Clock,
  Search,
  UserCheck,
  Lock,
  TrendingUp,
  Brain,
  Cpu,
  BarChart3,
  Moon,
  Sun,
  Infinity
} from "lucide-react";

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const [showAppBanner, setShowAppBanner] = useState(true);

  // Load ad scripts using useEffect
  useEffect(() => {
    const adContainer = document.getElementById("ad-container");
    if (!adContainer) return;

    adContainer.innerHTML = "";

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.innerHTML = `
      atOptions = {
        'key' : 'd89152563405b3e145016685931bd36b',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    adContainer.appendChild(script2);

    const script3 = document.createElement("script");
    script3.type = "text/javascript";
    script3.src = "//www.highperformanceformat.com/d89152563405b3e145016685931bd36b/invoke.js";
    script3.async = true;
    adContainer.appendChild(script3);

    return () => {
      adContainer.innerHTML = "";
    };
  }, []);

  const handleBuyNow = () => {
    window.open('https://your-actual-course-website.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes ring {
          0% { transform: rotate(0deg); }
          5% { transform: rotate(15deg); }
          10% { transform: rotate(-15deg); }
          15% { transform: rotate(10deg); }
          20% { transform: rotate(-10deg); }
          25% { transform: rotate(5deg); }
          30% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(233, 30, 99, 0.3); }
          50% { box-shadow: 0 0 40px rgba(233, 30, 99, 0.6), 0 0 60px rgba(156, 39, 176, 0.4); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-ring { animation: ring 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-glow { animation: glowPulse 3s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-2000 { animation-delay: 2s; }
        
        .gradient-text {
          background: linear-gradient(135deg, #e91e63, #9c27b0, #673ab7);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        .glass-dark {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .wedding-pattern {
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(233, 30, 99, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(103, 58, 183, 0.05) 0%, transparent 50%);
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-12px) scale(1.02);
        }
        
        /* AI Glow Effect */
        .ai-glow {
          position: relative;
        }
        
        .ai-glow::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #e91e63, #9c27b0, #673ab7, #3f51b5);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
          animation: gradient-shift 3s ease infinite;
          background-size: 300% 300%;
          filter: blur(8px);
        }
        
        .ai-glow:hover::before {
          opacity: 0.7;
        }
        
        /* Kundli Pattern */
        .kundli-bg {
          background-image: 
            conic-gradient(from 0deg at 50% 50%, rgba(255,152,0,0.1), rgba(255,193,7,0.1), rgba(255,152,0,0.1)),
            radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%);
        }
      `}</style>

      {/* Android App Banner */}
      {showAppBanner && (
        <div className="relative bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 text-white overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3 animate-fadeInLeft">
                <Smartphone className="w-5 h-5 animate-ring" />
                <span className="font-bold">🎉 Android App Launching Soon!</span>
                <span className="hidden sm:inline bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                  Early Access Available
                </span>
              </div>
              <button
                onClick={() => setShowAppBanner(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Wedding Theme */}
      <div className="relative wedding-pattern min-h-screen flex items-center">
        {/* Animated Background Elements - Wedding Theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-7xl opacity-10 animate-float">💍</div>
          <div className="absolute top-32 right-16 text-6xl opacity-10 animate-float delay-1000">💐</div>
          <div className="absolute top-1/2 left-20 text-5xl opacity-10 animate-float-slow delay-500">💝</div>
          <div className="absolute top-1/3 right-10 text-5xl opacity-10 animate-float delay-1500">✨</div>
          <div className="absolute bottom-32 right-32 text-6xl opacity-10 animate-float-slow delay-2000">🌹</div>
          <div className="absolute bottom-20 left-1/3 text-5xl opacity-10 animate-float delay-300">💕</div>
          <div className="absolute top-1/4 left-1/2 text-4xl opacity-10 animate-float-slow">🎊</div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-24' : 'pt-20'} pb-16 w-full`}>
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full shadow-2xl animate-fadeInDown">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">A</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">I</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg">+</div>
              </div>
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 animate-sparkle" />
              <span className="font-bold gradient-text">
                100,000+ Happy Couples Matched
              </span>
              <Award className="w-5 h-5 text-amber-500 animate-ring" />
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block gradient-text animate-fadeInUp mb-2">Where Hearts Unite</span>
              <span className="block text-gray-800 animate-fadeInUp delay-200">Destinies Align</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fadeInUp delay-300">
              India's #1 AI-Powered Matrimonial Platform. Find your perfect life partner with 
              <span className="font-bold text-purple-600"> Advanced Matching</span>, 
              <span className="font-bold text-rose-600"> AI Kundli Analysis</span>, and 
              <span className="font-bold text-indigo-600"> Verified Profiles</span>.
            </p>
          </div>
          
          {/* CTA Buttons */}
          {loggedIn ? (
            <div className="space-y-8 animate-fadeInUp delay-400">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl animate-glow">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">Welcome Back! Your Perfect Match Awaits</span>
                  <Heart className="w-6 h-6 animate-heartbeat fill-white" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/matches" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-rose-500/50 transition-all duration-500 hover:scale-110 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Search className="w-6 h-6" />
                    <span>Discover Matches</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Link>
                
                <Link 
                  to="/profile/me" 
                  className="group px-10 py-5 glass-effect text-gray-800 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 border-2 border-purple-200 hover:border-purple-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <UserCheck className="w-6 h-6 text-purple-600" />
                    <span>My Profile</span>
                  </div>
                </Link>
                
                <Link 
                  to="/membership" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 hover:scale-110 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Crown className="w-6 h-6 animate-ring" />
                    <span>Membership</span>
                    <Sparkles className="w-6 h-6" />
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fadeInUp delay-400">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/register" 
                  className="group relative px-12 py-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-rose-500/50 transition-all duration-500 hover:scale-110 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Sparkles className="w-7 h-7" />
                    <span>Start Free Today</span>
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Link>
                
                <Link 
                  to="/login" 
                  className="group px-12 py-6 glass-effect text-gray-800 rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 border-2 border-gray-300 hover:border-purple-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Lock className="w-7 h-7 text-purple-600" />
                    <span>Sign In</span>
                  </div>
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2 animate-slideUp">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 animate-slideUp delay-100">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Free forever</span>
                </div>
                <div className="flex items-center gap-2 animate-slideUp delay-200">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Cancel anytime</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Stats Section - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20">
            {[
              { number: "100K+", label: "Active Members", icon: Users, gradient: "from-blue-500 to-cyan-500", delay: "delay-100" },
              { number: "50K+", label: "Success Stories", icon: Heart, gradient: "from-rose-500 to-pink-500", delay: "delay-200" },
              { number: "95%", label: "Match Success", icon: TrendingUp, gradient: "from-green-500 to-emerald-500", delay: "delay-300" },
              { number: "24/7", label: "AI Support", icon: Clock, gradient: "from-purple-500 to-indigo-500", delay: "delay-400" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`group relative text-center p-8 glass-effect rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 card-hover animate-scaleIn ${stat.delay}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                <div className="relative">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 text-transparent bg-gradient-to-br ${stat.gradient} bg-clip-text`} />
                  <div className={`text-5xl font-black mb-3 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-bold text-sm tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI-POWERED KUNDLI MATCHING SECTION */}
      <div className="relative bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-7xl opacity-10 animate-float">🔮</div>
          <div className="absolute bottom-20 right-20 text-7xl opacity-10 animate-float delay-1000">⭐</div>
          <div className="absolute top-1/2 right-10 text-6xl opacity-10 animate-float-slow">🌙</div>
          <div className="absolute bottom-1/3 left-20 text-6xl opacity-10 animate-float-slow delay-500">☀️</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-2xl animate-fadeInDown">
              <Brain className="w-6 h-6 animate-pulse" />
              <span>Powered by Advanced AI & Vedic Astrology</span>
              <Cpu className="w-6 h-6 animate-sparkle" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 animate-fadeInUp">
              <span className="gradient-text">AI-Powered Kundli</span>
              <br />
              <span className="text-gray-800">Matching System</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fadeInUp delay-200">
              Check astrological compatibility with your liked partners using our revolutionary 
              <span className="font-bold text-purple-600"> AI-driven Kundli analysis</span>. 
              Get instant, accurate predictions combining ancient wisdom with modern technology.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left: AI Visualization */}
            <div className="relative animate-slideInLeft">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              
              <div className="relative kundli-bg rounded-3xl p-12 shadow-2xl border-2 border-orange-200">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="text-9xl mb-4 animate-float">🔮</div>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      AI Enhanced
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-800 mb-6 flex items-center justify-center gap-3">
                    <Zap className="w-8 h-8 text-yellow-500 animate-sparkle" />
                    Instant AI Analysis
                    <Zap className="w-8 h-8 text-yellow-500 animate-sparkle" />
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Star, text: "36-Point Guna Milan Analysis", color: "from-amber-500 to-orange-600" },
                    { icon: Moon, text: "Manglik Dosha Detection", color: "from-blue-500 to-indigo-600" },
                    { icon: Sun, text: "Planetary Position Insights", color: "from-yellow-500 to-red-600" },
                    { icon: Infinity, text: "Dasha Compatibility Check", color: "from-purple-500 to-pink-600" },
                    { icon: BarChart3, text: "AI-Powered Ashtakoota Matching", color: "from-green-500 to-emerald-600" }
                  ].map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-4 glass-effect px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slideUp`} style={{animationDelay: `${idx * 100}ms`}}>
                      <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl shadow-lg`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-gray-800 flex-1">{feature.text}</span>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                    <Cpu className="w-5 h-5 animate-pulse" />
                    <span>99.9% AI Accuracy Rate</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Features & Benefits */}
            <div className="space-y-6 animate-slideInRight">
              {[
                {
                  icon: Brain,
                  gradient: "from-purple-500 to-indigo-600",
                  title: "Advanced AI Intelligence",
                  description: "Our neural network analyzes 10,000+ astrological data points in milliseconds, providing deeper insights than traditional methods. Machine learning ensures predictions get more accurate over time.",
                  badge: "AI Powered"
                },
                {
                  icon: Zap,
                  gradient: "from-yellow-500 to-orange-600",
                  title: "Lightning Fast Results",
                  description: "Get comprehensive Kundli matching reports instantly. No waiting, no delays. Compare birth charts with any liked profile and receive detailed compatibility scores in real-time.",
                  badge: "Instant"
                },
                {
                  icon: Shield,
                  gradient: "from-green-500 to-emerald-600",
                  title: "100% Private & Secure",
                  description: "Your birth details, Kundli information, and astrological data are encrypted with military-grade security. We never share your personal information with anyone.",
                  badge: "Encrypted"
                },
                {
                  icon: Award,
                  gradient: "from-rose-500 to-pink-600",
                  title: "Expert Verified System",
                  description: "Developed in collaboration with renowned Vedic astrologers and validated by AI experts. Combines 5000+ years of astrological wisdom with cutting-edge technology.",
                  badge: "Verified"
                }
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  className={`group relative glass-effect p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 card-hover ai-glow animate-scaleIn`}
                  style={{animationDelay: `${idx * 150}ms`}}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`px-4 py-2 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full shadow-lg`}>
                        {feature.badge}
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-black text-gray-800 mb-3">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
              
              {loggedIn && (
                <Link 
                  to="/kundli-matching"
                  className="group block w-full text-center px-10 py-6 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white rounded-full font-black text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Brain className="w-7 h-7" />
                    <span>Check AI Kundli Compatibility Now</span>
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              )}
            </div>
          </div>
          
          {/* AI Stats */}
          <div className="grid md:grid-cols-4 gap-6 animate-fadeInUp">
            {[
              { number: "10K+", label: "Data Points Analyzed", icon: Cpu },
              { number: "99.9%", label: "AI Accuracy", icon: TrendingUp },
              { number: "<1s", label: "Analysis Time", icon: Zap },
              { number: "50K+", label: "Matches Made", icon: Heart }
            ].map((stat, idx) => (
              <div key={idx} className="text-center glass-effect p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <div className="text-4xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-700 font-bold text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 animate-fadeInUp">
            Why We're <span className="gradient-text">The Best</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fadeInUp delay-200">
            Experience the most advanced, secure, and successful matrimonial platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              gradient: "from-rose-500 to-pink-600",
              title: "Smart AI Matching",
              description: "Advanced machine learning analyzes 200+ compatibility factors including lifestyle, values, goals, and personality to find your perfect match with 95% accuracy.",
              badge: "99% Success",
              delay: "delay-100"
            },
            {
              icon: MessageCircle,
              gradient: "from-purple-500 to-indigo-600",
              title: "Secure Chat Platform",
              description: "Military-grade end-to-end encryption for all conversations. Share photos, videos, and voice messages in a private, AI-moderated environment.",
              badge: "Military Grade",
              delay: "delay-200"
            },
            {
              icon: Shield,
              gradient: "from-blue-500 to-cyan-600",
              title: "100% Verified Profiles",
              description: "Every profile undergoes AI-powered verification with photo checks, ID proof, and background screening. Zero fake profiles guaranteed.",
              badge: "AI Verified",
              delay: "delay-300"
            },
            {
              icon: Star,
              gradient: "from-orange-500 to-red-600",
              title: "AI Kundli Matching",
              description: "Revolutionary AI-enhanced Vedic astrology matching with instant Guna Milan, Manglik analysis, and planetary compatibility reports.",
              badge: "AI Enhanced",
              delay: "delay-400"
            },
            {
              icon: Users,
              gradient: "from-green-500 to-emerald-600",
              title: "Personalized AI",
              description: "Our AI learns your preferences and behavior to curate perfect matches daily. The more you use, the smarter it gets.",
              badge: "Self Learning",
              delay: "delay-500"
            },
            {
              icon: Crown,
              gradient: "from-amber-500 to-yellow-600",
              title: "Premium Benefits",
              description: "Unlock unlimited messaging, advanced AI filters, profile boosting, priority support, and exclusive matchmaking concierge service.",
              badge: "VIP Access",
              delay: "delay-1000"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 card-hover overflow-hidden border border-gray-100 animate-scaleIn ${feature.delay}`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-5 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`px-4 py-2 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full shadow-lg animate-pulse`}>
                    {feature.badge}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Learn More */}
                <div className="flex items-center gap-2 text-transparent bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text font-bold group-hover:gap-3 transition-all duration-300">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Bottom gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Ad Section */}
        <div className="mt-24 space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl animate-fadeInUp">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="relative text-center z-10">
              <div className="inline-block mb-4">
                <div className="px-6 py-2 bg-yellow-400 text-gray-900 font-black rounded-full text-sm shadow-lg animate-pulse">
                  ⚡ LIMITED TIME OFFER ⚡
                </div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                VIEW ALL COURSES
              </h3>
              <div className="text-5xl md:text-6xl font-black text-yellow-300 mb-4 tracking-tight">
                HUGE MEXECON
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-8">
                WONSTER IS HERE
              </div>
              <button 
                onClick={handleBuyNow}
                className="group relative px-12 py-5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black rounded-full text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative flex items-center gap-3">
                  <span>BUY NOW</span>
                  <Zap className="w-7 h-7" />
                </div>
              </button>
            </div>
          </div>
          
          {/* Ad container */}
          <div id="ad-container" className="flex justify-center"></div>

          {/* Facilities Section */}
          <div className="glass-effect rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h4 className="text-3xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-purple-600 animate-ring" />
                Our Premium Facilities
                <Award className="w-8 h-8 text-purple-600 animate-ring" />
              </h4>
            </div>
            <p className="text-gray-600 text-center text-lg leading-relaxed max-w-4xl mx-auto">
              We provide AI-powered matching systems, certified relationship counselors, 24/7 premium support, 
              military-grade security infrastructure, and a dedicated matchmaking concierge team to ensure 
              the best experience for every member on their journey to finding true love.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-7xl opacity-20 animate-float">💑</div>
        <div className="absolute bottom-10 right-10 text-7xl opacity-20 animate-float delay-1000">💕</div>
        <div className="absolute top-1/2 right-20 text-6xl opacity-20 animate-float-slow">💝</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg animate-fadeInDown">
              <Heart className="w-5 h-5 fill-white animate-heartbeat" />
              <span>Real Love Stories</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 animate-fadeInUp">
              Happily Ever After <span className="gradient-text">Starts Here</span>
            </h2>
            <p className="text-xl text-gray-600 animate-fadeInUp delay-200">
              Join thousands who found their soulmate through AI-powered matching
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael",
                image: "👫",
                location: "Mumbai, India",
                text: "The AI Kundli matching gave us confidence in our compatibility! The predictions were incredibly accurate. We're planning our dream wedding now and couldn't be happier!",
                date: "Married Dec 2023",
                rating: 5,
                gradient: "from-rose-500 to-pink-600",
                delay: "delay-100"
              },
              {
                name: "Priya & Raj",
                image: "💑",
                location: "Delhi, India",
                text: "After using the AI matching system for 2 months, we found each other! The compatibility score was 98%. Our families are thrilled with how perfect we are together!",
                date: "Married Jan 2024",
                rating: 5,
                gradient: "from-purple-500 to-indigo-600",
                delay: "delay-200"
              },
              {
                name: "Emma & James",
                image: "👩‍❤️‍👨",
                location: "Bangalore, India",
                text: "The premium AI matchmaking service is worth every penny! Got personalized Kundli analysis and met my perfect match within weeks. Highly recommended!",
                date: "Engaged Feb 2024",
                rating: 5,
                gradient: "from-blue-500 to-cyan-600",
                delay: "delay-300"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`group relative glass-effect p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 card-hover animate-scaleIn ${testimonial.delay}`}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl`}></div>
                
                <div className="mb-6">
                  <div className="text-8xl mb-4 text-center animate-float">{testimonial.image}</div>
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-sparkle" style={{animationDelay: `${i * 200}ms`}} />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed text-center font-medium">
                  "{testimonial.text}"
                </p>
                
                <div className="text-center pt-6 border-t-2 border-gray-200">
                  <p className="font-black text-xl text-gray-900 mb-1">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mb-3">{testimonial.location}</p>
                  <div className={`inline-block px-5 py-2 bg-gradient-to-r ${testimonial.gradient} text-white rounded-full text-sm font-bold shadow-lg`}>
                    {testimonial.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/success-stories"
              className="inline-flex items-center gap-3 px-10 py-5 glass-effect text-purple-600 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>View 50,000+ Success Stories</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 rounded-3xl p-16 md:p-20 text-center shadow-2xl overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
            <div className="absolute top-20 right-20 text-9xl opacity-10 animate-float">💍</div>
            <div className="absolute bottom-20 left-20 text-9xl opacity-10 animate-float delay-1000">💐</div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="text-8xl mb-6 animate-heartbeat">💝</div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Your Perfect Match is
                <br />
                <span className="text-yellow-300">Just One Click Away!</span>
              </h2>
              <p className="text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-semibold">
                Join India's #1 AI-Powered Matrimonial Platform. Over 1,000 marriages happen every month!
              </p>
            </div>
            
            {!loggedIn ? (
              <div className="space-y-8">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center justify-center gap-4 bg-white text-purple-600 px-16 py-7 rounded-full text-2xl font-black shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-110"
                >
                  <Sparkles className="w-8 h-8 animate-sparkle" />
                  <span>Start Your Journey Free</span>
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-7 h-7 text-green-300" />
                    <span className="font-bold text-lg">2 Million+ Members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-7 h-7 text-green-300" />
                    <span className="font-bold text-lg">100% Free to Join</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-7 h-7 text-green-300" />
                    <span className="font-bold text-lg">AI-Powered Matching</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  to="/matches" 
                  className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-12 py-6 rounded-full text-xl font-black shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-110"
                >
                  <Search className="w-7 h-7" />
                  <span>Find Your Match</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <Link 
                  to="/membership" 
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-6 rounded-full text-xl font-black shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 hover:scale-110"
                >
                  <Crown className="w-7 h-7 animate-ring" />
                  <span>Upgrade to Premium</span>
                  <Sparkles className="w-7 h-7" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black mb-4 gradient-text">
              Find Your Forever
            </h3>
            <div className="flex justify-center gap-6 mb-6">
              {['💕', '💑', '💍', '🌹', '✨'].map((emoji, idx) => (
                <span key={idx} className="text-5xl opacity-70 hover:scale-125 transition-transform duration-300 cursor-pointer animate-float" style={{animationDelay: `${idx * 200}ms`}}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-300 mb-3 text-lg">
              © 2025 Matrimonial. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              Made with <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartbeat" /> using AI for bringing souls together
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}