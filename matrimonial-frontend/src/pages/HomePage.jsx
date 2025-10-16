import React, { useEffect } from "react";
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
  Globe,
  TrendingUp
} from "lucide-react";

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const [showAppBanner, setShowAppBanner] = React.useState(true);

  // Load ad scripts using useEffect
  useEffect(() => {
    const adContainer = document.getElementById("ad-container");
    if (!adContainer) return;

    adContainer.innerHTML = "";

    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src = "//pl27816842.effectivegatecpm.com/ae/43/d2/ae43d226a3be9560b9600b25ef141bcf.js";
    script1.async = true;
    adContainer.appendChild(script1);

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
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes ring {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-ring { animation: ring 2s ease-in-out infinite; }
        
        .gradient-text {
          background: linear-gradient(135deg, #e91e63, #9c27b0, #673ab7);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .wedding-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(233, 30, 99, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.05) 0%, transparent 50%);
        }
        
        /* Floating hearts background */
        .floating-hearts::before,
        .floating-hearts::after {
          content: '💕';
          position: absolute;
          font-size: 2rem;
          opacity: 0.1;
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-hearts::before {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .floating-hearts::after {
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
      `}</style>

      {/* Android App Coming Soon Banner */}
      {showAppBanner && (
        <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 animate-ring" />
                <span className="font-bold">🎉 Android App Launching Soon!</span>
                <span className="hidden sm:inline bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
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
      <div className="relative wedding-pattern">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">💍</div>
          <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float" style={{animationDelay: '1s'}}>💐</div>
          <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float" style={{animationDelay: '2s'}}>💝</div>
          <div className="absolute top-60 right-10 text-4xl opacity-10 animate-float" style={{animationDelay: '3s'}}>✨</div>
          <div className="absolute bottom-20 right-40 text-5xl opacity-10 animate-float" style={{animationDelay: '1.5s'}}>🌹</div>
        </div>
        
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-20' : 'pt-24'} pb-24`}>
          {/* Trust Badge */}
          <div className="text-center mb-8 animate-fadeInUp">
            <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full shadow-xl">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">S</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">M</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">A</div>
              </div>
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 animate-sparkle" />
              <span className="font-semibold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by 100,000+ Happy Couples
              </span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight animate-fadeInUp">
              <span className="block gradient-text mb-2">Where Hearts Meet</span>
              <span className="block text-gray-800">Destinies Unite</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              India's most trusted matrimonial platform. Find your perfect life partner 
              with <span className="font-bold text-purple-600">AI-powered matching</span>, 
              <span className="font-bold text-rose-600"> Kundli compatibility</span>, and 
              <span className="font-bold text-indigo-600"> verified profiles</span>.
            </p>
          </div>
          
          {/* CTA Buttons */}
          {loggedIn ? (
            <div className="space-y-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">Welcome Back! Your Perfect Match Awaits</span>
                  <Heart className="w-6 h-6 animate-heartbeat fill-white" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/matches" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-rose-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
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
                  className="group px-10 py-5 bg-white text-gray-800 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 border-2 border-purple-200 hover:border-purple-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <UserCheck className="w-6 h-6 text-purple-600" />
                    <span>My Profile</span>
                  </div>
                </Link>
                
                <Link 
                  to="/membership" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Crown className="w-6 h-6 animate-ring" />
                    <span>Go Premium</span>
                    <Sparkles className="w-6 h-6" />
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/register" 
                  className="group relative px-12 py-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-rose-500/50 transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <span>Register Free</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Link>
                
                <Link 
                  to="/login" 
                  className="group px-12 py-6 bg-white text-gray-800 rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 border-2 border-gray-300 hover:border-purple-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Lock className="w-6 h-6 text-purple-600" />
                    <span>Sign In</span>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Stats Section - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
            {[
              { number: "100K+", label: "Active Members", icon: Users, color: "from-blue-500 to-cyan-500" },
              { number: "50K+", label: "Success Stories", icon: Heart, color: "from-rose-500 to-pink-500" },
              { number: "95%", label: "Match Success Rate", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
              { number: "24/7", label: "Premium Support", icon: Clock, color: "from-purple-500 to-indigo-500" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group relative text-center p-8 glass-effect rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                <div className="relative">
                  <stat.icon className={`w-10 h-10 mx-auto mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  <div className={`text-4xl font-extrabold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* NEW: Kundli Matching Feature Section */}
      <div className="bg-gradient-to-br from-orange-50 via-rose-50 to-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg">
              <Star className="w-5 h-5 fill-white" />
              <span>Powered by Vedic Astrology</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text">
              Kundli Matching Made Easy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check compatibility with your liked partners using our advanced Kundli matching system. 
              Get detailed insights on Guna Milan, Manglik Dosha, and more.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-500 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative glass-effect rounded-3xl p-12 shadow-2xl">
                <div className="text-center">
                  <div className="text-9xl mb-6 animate-float">🔮</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Instant Kundli Reports</h3>
                  <div className="space-y-4">
                    {[
                      "36-Point Guna Milan Analysis",
                      "Manglik Dosha Detection",
                      "Planetary Position Insights",
                      "Dasha Compatibility Check",
                      "Ashtakoota Matching"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/60 px-4 py-3 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="font-semibold text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Features */}
            <div className="space-y-6">
              <div className="glass-effect p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Accurate Predictions</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our expert astrologers ensure 99% accuracy in Kundli analysis using traditional Vedic methods combined with modern technology.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Instant Results</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Get comprehensive Kundli matching reports in seconds. Compare birth charts with any liked profile instantly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">100% Private & Secure</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Your birth details and Kundli information are encrypted and never shared. Complete privacy guaranteed.
                    </p>
                  </div>
                </div>
              </div>
              
              {loggedIn && (
                <Link 
                  to="/kundli-matching"
                  className="block w-full text-center px-8 py-5 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span>Check Kundli Compatibility Now</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            Why We're <span className="gradient-text">Different</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most advanced, secure, and successful matrimonial platform in India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              gradient: "from-rose-500 to-pink-600",
              title: "AI-Powered Smart Matching",
              description: "Our advanced machine learning algorithm analyzes 200+ compatibility factors including lifestyle, values, goals, and preferences to find your perfect match.",
              badge: "99% Accuracy"
            },
            {
              icon: MessageCircle,
              gradient: "from-purple-500 to-indigo-600",
              title: "Secure End-to-End Chat",
              description: "Connect safely with military-grade encryption. Share photos, videos, and voice messages in a private, moderated environment.",
              badge: "Military Grade"
            },
            {
              icon: Shield,
              gradient: "from-blue-500 to-cyan-600",
              title: "Verified Profiles Only",
              description: "Every profile undergoes strict verification. Photo verification, ID proof, and background checks ensure 100% authentic members.",
              badge: "100% Verified"
            },
            {
              icon: Star,
              gradient: "from-orange-500 to-red-600",
              title: "Vedic Kundli Matching",
              description: "Traditional Kundli matching with Guna Milan, Manglik Dosha check, and detailed horoscope compatibility analysis by expert astrologers.",
              badge: "Astro Experts"
            },
            {
              icon: Users,
              gradient: "from-green-500 to-emerald-600",
              title: "Personalized Recommendations",
              description: "Get daily curated matches based on your preferences. Our AI learns from your behavior to improve suggestions over time.",
              badge: "Smart AI"
            },
            {
              icon: Crown,
              gradient: "from-amber-500 to-yellow-600",
              title: "Premium Memberships",
              description: "Unlock advanced filters, unlimited messaging, profile boosting, priority customer support, and exclusive matchmaking services.",
              badge: "VIP Access"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border border-gray-100"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Badge */}
                  <div className="absolute -top-2 -right-2">
                    <div className={`px-3 py-1 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {feature.badge}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-transparent bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text font-bold group-hover:gap-3 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Bottom gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Ad Section - Enhanced */}
        <div className="mt-24 space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative text-center z-10">
              <div className="inline-block mb-4">
                <div className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full text-sm shadow-lg animate-pulse">
                  LIMITED TIME OFFER
                </div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
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
                className="group relative px-12 py-5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-full text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative flex items-center gap-3">
                  <span>BUY NOW</span>
                  <Zap className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
          
          {/* Ad container */}
          <div id="ad-container" className="flex justify-center">
            {/* Ads will be loaded here by the scripts */}
          </div>

          {/* Facilities Section - Enhanced */}
          <div className="glass-effect rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h4 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-purple-600" />
                Our Premium Facilities
                <Award className="w-8 h-8 text-purple-600" />
              </h4>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Advanced Matchmaking Lab",
                  description: "State-of-the-art AI systems analyzing millions of data points for perfect matches"
                },
                {
                  icon: Users,
                  title: "Expert Relationship Counselors",
                  description: "Certified marriage counselors and astrologers to guide your journey"
                },
                {
                  icon: Clock,
                  title: "Flexible Support Timings",
                  description: "24/7 premium customer support via chat, phone, and video call"
                },
                {
                  icon: Shield,
                  title: "Secure Environment",
                  description: "Bank-level security with privacy protection and data encryption"
                }
              ].map((facility, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                    <facility.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-gray-900 mb-2">{facility.title}</h5>
                    <p className="text-gray-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section - Enhanced */}
      <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">💑</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float" style={{animationDelay: '2s'}}>💕</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg">
              <Heart className="w-5 h-5 fill-white animate-heartbeat" />
              <span>Real Love Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Happily Ever After <span className="gradient-text">Starts Here</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of couples who found their soulmate through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael",
                image: "👫",
                location: "Mumbai, India",
                text: "We never believed in online matchmaking until we tried this platform. The Kundli matching gave us confidence, and the AI suggestions were spot-on. Now we're planning our dream wedding!",
                date: "Married in Dec 2023",
                rating: 5,
                color: "from-rose-500 to-pink-600"
              },
              {
                name: "Priya & Raj",
                image: "💑",
                location: "Delhi, India",
                text: "After 6 months of searching, we found each other through this amazing platform. The verification process made us feel secure, and the chat features helped us connect deeply before meeting.",
                date: "Married in Jan 2024",
                rating: 5,
                color: "from-purple-500 to-indigo-600"
              },
              {
                name: "Emma & James",
                image: "👩‍❤️‍👨",
                location: "Bangalore, India",
                text: "The premium membership was worth every penny! We got personalized matchmaking support and detailed Kundli analysis. Our families are thrilled with the match!",
                date: "Engaged Feb 2024",
                rating: 5,
                color: "from-blue-500 to-cyan-600"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="group relative glass-effect p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
                
                <div className="mb-6">
                  <div className="text-7xl mb-4 text-center animate-float">{testimonial.image}</div>
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed text-center">
                  "{testimonial.text}"
                </p>
                
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="font-bold text-xl text-gray-900 mb-1">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${testimonial.color} text-white rounded-full text-sm font-semibold`}>
                    {testimonial.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Success Stories */}
          <div className="text-center mt-12">
            <Link 
              to="/success-stories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>View All Success Stories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Final CTA Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 rounded-3xl p-16 md:p-20 text-center shadow-2xl overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-20 right-20 text-8xl opacity-10 animate-float">💍</div>
            <div className="absolute bottom-20 left-20 text-8xl opacity-10 animate-float" style={{animationDelay: '1s'}}>💐</div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="text-7xl mb-6 animate-heartbeat">💝</div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Your Perfect Match is
                <br />
                <span className="text-yellow-300">Just a Click Away!</span>
              </h2>
              <p className="text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join India's most trusted matrimonial platform. Over 1,000 marriages happen every month through our platform.
              </p>
            </div>
            
            {!loggedIn ? (
              <div className="space-y-6">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-14 py-6 rounded-full text-2xl font-extrabold shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-110"
                >
                  <Sparkles className="w-7 h-7" />
                  <span>Start Your Journey Free</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <div className="flex items-center justify-center gap-8 text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    <span className="font-semibold">2 Million+ Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    <span className="font-semibold">100% Free to Join</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  to="/matches" 
                  className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-12 py-6 rounded-full text-xl font-extrabold shadow-2xl hover:shadow-white/30 transition-all duration-500 hover:scale-110"
                >
                  <Search className="w-6 h-6" />
                  <span>Find Your Match</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <Link 
                  to="/membership" 
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-6 rounded-full text-xl font-extrabold shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 hover:scale-110"
                >
                  <Crown className="w-6 h-6 animate-ring" />
                  <span>Upgrade to Premium</span>
                  <Sparkles className="w-6 h-6" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer - Enhanced */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
              Find Your Forever
            </h3>
            <div className="flex justify-center gap-6 mb-6">
              {['💕', '💑', '💍', '🌹', '✨'].map((emoji, idx) => (
                <span key={idx} className="text-4xl opacity-70 hover:scale-125 transition-transform duration-300 cursor-pointer">
                  {emoji}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
            <div>
              <h4 className="font-bold text-lg mb-4 text-rose-400">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link to="/membership" className="hover:text-white transition-colors">Membership Plans</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-purple-400">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/safety" className="hover:text-white transition-colors">Safety Tips</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-indigo-400">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-pink-400">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-400 mb-2">
              © 2025 Matrimonial. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-heartbeat" /> for bringing souls together
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}