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
  TrendingUp,
  Award,
  Lock,
  Send,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const [showAppBanner, setShowAppBanner] = useState(true);
  const [showKundliModal, setShowKundliModal] = useState(false);
  const [kundliData, setKundliData] = useState({
    user: { name: '', dob: '', time: '', place: '' },
    partner: { name: '', dob: '', time: '', place: '' }
  });

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

  const handleKundliSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your AI Kundli API
    alert('Generating AI-powered Kundli compatibility report...');
    // Simulate API call
    console.log('Kundli Data:', kundliData);
  };

  const updateKundliData = (person, field, value) => {
    setKundliData(prev => ({
      ...prev,
      [person]: { ...prev[person], [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <Heart className="w-6 h-6 text-rose-200 opacity-30" fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Android App Banner */}
      {showAppBanner && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 animate-bounce" />
                <span className="font-semibold">Android App Coming Soon!</span>
                <span className="hidden sm:inline text-emerald-50">Experience seamless matchmaking on mobile</span>
              </div>
              <button
                onClick={() => setShowAppBanner(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-24' : 'pt-20'} pb-20`}>
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white border border-rose-200 text-rose-600 px-5 py-2 rounded-full text-sm font-semibold shadow-lg animate-fade-in">
              <Award className="w-4 h-4" />
              <span>India's Most Trusted Matrimonial Platform</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Where Hearts Meet
              </span>
              <br />
              <span className="text-gray-800">Destinies Unite</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover meaningful connections with AI-powered Kundli matching.
              <br />Your perfect match is just a click away.
            </p>

            {/* AI Kundli Feature Highlight */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 border border-amber-300 text-amber-800 px-5 py-3 rounded-full text-sm font-semibold mb-10 shadow-md">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>NEW: AI-Powered Kundli Compatibility Analysis</span>
            </div>
            
            {/* CTA Buttons */}
            {loggedIn ? (
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border-2 border-emerald-300 text-emerald-700 px-6 py-3 rounded-full shadow-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Welcome Back! Your Journey Continues</span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                  <Link 
                    to="/matches" 
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <Heart className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Browse Matches</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button 
                    onClick={() => setShowKundliModal(true)}
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Check Kundli Match</span>
                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <Link 
                    to="/membership" 
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Crown className="w-5 h-5" />
                    <span>Go Premium</span>
                    <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/register" 
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <Sparkles className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Start Your Journey Free</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-10 py-5 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 shadow-lg"
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
                
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" /> Free Forever</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-emerald-500" /> 100% Secure</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-emerald-500" /> Verified Profiles</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Stats Section with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: "1M+", label: "Active Users", icon: Users },
              { number: "500K+", label: "Success Stories", icon: Heart },
              { number: "98%", label: "Match Rate", icon: TrendingUp },
              { number: "24/7", label: "Support", icon: MessageCircle }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Kundli Matching Section */}
      <div className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Astrology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Kundli Compatibility Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check astrological compatibility with your potential partner using advanced AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                { title: "Gun Milan Analysis", desc: "36-point compatibility check based on Vedic astrology", icon: Star },
                { title: "Mangal Dosha Check", desc: "Identify and understand Mars positioning effects", icon: Shield },
                { title: "Dasha Predictions", desc: "Future compatibility insights and timing analysis", icon: TrendingUp },
                { title: "Planetary Positions", desc: "Detailed analysis of all planetary alignments", icon: Sparkles }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-amber-100 rounded-lg flex-shrink-0">
                    <item.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-amber-200">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Try Kundli Matching
                </h3>
                <p className="text-gray-600 text-sm">
                  Get instant AI-powered compatibility insights
                </p>
              </div>
              
              <button
                onClick={() => setShowKundliModal(true)}
                className="w-full group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-5 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>Check Compatibility Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Free for all registered users • Instant results
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Couples Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience premium features designed for meaningful connections
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              gradient: "from-rose-500 to-pink-600",
              title: "Smart AI Matching",
              description: "Our advanced algorithm analyzes 50+ compatibility factors including personality, values, lifestyle, and astrological compatibility."
            },
            {
              icon: Shield,
              gradient: "from-emerald-500 to-teal-600",
              title: "100% Verified Profiles",
              description: "Every profile undergoes manual verification with ID proof, ensuring authenticity and safety for all our members."
            },
            {
              icon: MessageCircle,
              gradient: "from-purple-500 to-indigo-600",
              title: "Secure Messaging",
              description: "Connect privately through end-to-end encrypted messaging. Your conversations are completely secure and confidential."
            },
            {
              icon: Sparkles,
              gradient: "from-amber-500 to-orange-600",
              title: "Kundli Matching",
              description: "AI-powered astrological compatibility analysis with detailed Gun Milan, Mangal Dosha check, and planetary insights."
            },
            {
              icon: Users,
              gradient: "from-blue-500 to-cyan-600",
              title: "Personalized Experience",
              description: "Advanced filters for religion, caste, profession, location, and lifestyle preferences to find your ideal match."
            },
            {
              icon: Crown,
              gradient: "from-violet-500 to-purple-600",
              title: "Premium Features",
              description: "Priority profile visibility, unlimited messaging, advanced filters, and dedicated relationship advisor support."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full"></div>
              
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Course Ad Banner */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 shadow-2xl text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              VIEW ALL COURSES
            </h3>
            <div className="text-4xl md:text-5xl font-extrabold text-yellow-300 mb-3">
              HUGE MEXECON
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-6">
              WONSTER IS HERE
            </div>
            <button 
              onClick={handleBuyNow}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              BUY NOW
            </button>
          </div>
          
          <div id="ad-container" className="mt-8 flex justify-center"></div>

          <div className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Facilities</h4>
            <p className="text-gray-600 text-center text-lg leading-relaxed max-w-3xl mx-auto">
              We provide well-equipped labs, experienced instructors, flexible class timings, and a supportive learning environment to ensure the best training experience for every student.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Real Love Stories
            </h2>
            <p className="text-xl text-gray-600">
              Thousands of successful marriages, countless happy moments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael",
                image: "👫",
                text: "The Kundli matching feature gave us confidence. We're now happily married for 2 years!",
                rating: 5,
                date: "Married 2023"
              },
              {
                name: "Priya & Raj",
                image: "💑",
                text: "Found my perfect match within 3 months. The AI compatibility score was spot on!",
                rating: 5,
                date: "Married 2024"
              },
              {
                name: "Emma & David",
                image: "👩‍❤️‍👨",
                text: "Verified profiles and secure messaging made us feel safe throughout our journey together.",
                rating: 5,
                date: "Engaged 2024"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-6xl mb-4 text-center">{testimonial.image}</div>
                <p className="text-gray-700 mb-6 italic leading-relaxed text-center">
                  "{testimonial.text}"
                </p>
                <div className="text-center border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Perfect Match Awaits
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join millions of people who found their life partner through our platform
            </p>
            
            {!loggedIn ? (
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            ) : (
              <Link 
                to="/membership" 
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <Crown className="w-6 h-6" />
                <span>Upgrade to Premium</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Kundli Modal */}
      {showKundliModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-t-2xl flex justify-between items-center z-10">
              <div>
                <h3 className="text-2xl font-bold mb-1">AI Kundli Compatibility Check</h3>
                <p className="text-sm text-amber-50">Get instant astrological compatibility insights</p>
              </div>
              <button
                onClick={() => setShowKundliModal(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by Advanced AI & Vedic Astrology</span>
                </div>
                <p className="text-gray-600">
                  Enter accurate birth details for both partners to get comprehensive compatibility analysis
                </p>
              </div>

              <form onSubmit={handleKundliSubmit} className="space-y-6">
                {/* User Details Section */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Your Birth Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        value={kundliData.user.name}
                        onChange={(e) => updateKundliData('user', 'name', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Date of Birth
                      </label>
                      <input 
                        type="date" 
                        value={kundliData.user.dob}
                        onChange={(e) => updateKundliData('user', 'dob', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Time of Birth
                      </label>
                      <input 
                        type="time" 
                        value={kundliData.user.time}
                        onChange={(e) => updateKundliData('user', 'time', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Place of Birth
                      </label>
                      <input 
                        type="text" 
                        placeholder="City, State, Country" 
                        value={kundliData.user.place}
                        onChange={(e) => updateKundliData('user', 'place', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Partner Details Section */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl border-2 border-rose-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    Partner's Birth Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter partner's full name" 
                        value={kundliData.partner.name}
                        onChange={(e) => updateKundliData('partner', 'name', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Date of Birth
                      </label>
                      <input 
                        type="date" 
                        value={kundliData.partner.dob}
                        onChange={(e) => updateKundliData('partner', 'dob', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Time of Birth
                      </label>
                      <input 
                        type="time" 
                        value={kundliData.partner.time}
                        onChange={(e) => updateKundliData('partner', 'time', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Place of Birth
                      </label>
                      <input 
                        type="text" 
                        placeholder="City, State, Country" 
                        value={kundliData.partner.place}
                        onChange={(e) => updateKundliData('partner', 'place', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" 
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Compatibility Report</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Info Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-800 mb-2">
                        <strong>What You'll Get:</strong>
                      </p>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• <strong>Gun Milan Score</strong> - Out of 36 points for compatibility</li>
                        <li>• <strong>Mangal Dosha Analysis</strong> - Mars positioning effects</li>
                        <li>• <strong>Nadi Dosha Check</strong> - Health and progeny compatibility</li>
                        <li>• <strong>Planetary Insights</strong> - Detailed planetary position analysis</li>
                        <li>• <strong>Dasha Compatibility</strong> - Future timing predictions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Your data is encrypted and never shared with third parties</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                Matrimonial
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Making matches, creating memories, building families since 2020
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-6">
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-white transition-colors">Success Stories</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">📷</span>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 Matrimonial Platform. All rights reserved. Made with ❤️ for bringing people together.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes float-heart {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-float-heart {
          animation: float-heart linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f43f5e, #a855f7);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #e11d48, #9333ea);
        }
      `}</style>
    </div>
  );
}