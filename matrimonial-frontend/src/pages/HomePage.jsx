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
    <div className="min-h-screen bg-white">
      {/* Clean CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        
        .gradient-text {
          background: linear-gradient(135deg, #e91e63, #9c27b0);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #e91e63, #9c27b0);
          color: white;
          font-weight: bold;
          padding: 1rem 2rem;
          border-radius: 9999px;
          box-shadow: 0 10px 25px rgba(233, 30, 99, 0.3);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(233, 30, 99, 0.4);
        }
        
        .btn-secondary {
          background: white;
          color: #333;
          font-weight: bold;
          padding: 1rem 2rem;
          border-radius: 9999px;
          border: 2px solid #e0e0e0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-secondary:hover {
          transform: translateY(-2px);
          border-color: #e91e63;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
      `}</style>

      {/* Android App Banner */}
      {showAppBanner && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5" />
                <span className="font-semibold">Android App Launching Soon!</span>
                <span className="hidden sm:inline bg-white/20 px-3 py-1 rounded-full text-sm">
                  Early Access Available
                </span>
              </div>
              <button
                onClick={() => setShowAppBanner(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-50 to-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-20' : 'pt-16'} pb-20`}>
          {/* Trust Badge */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-gray-700">
                100,000+ Happy Couples Matched
              </span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fadeInUp">
              <span className="block gradient-text">Where Hearts Unite</span>
              <span className="block text-gray-800">Destinies Align</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fadeInUp delay-200">
              India's #1 AI-Powered Matrimonial Platform. Find your perfect life partner with 
              <span className="font-semibold text-purple-600"> Advanced Matching</span> and 
              <span className="font-semibold text-rose-600"> Verified Profiles</span>.
            </p>
          </div>
          
          {/* CTA Buttons */}
          {loggedIn ? (
            <div className="space-y-6">
              <div className="flex justify-center animate-fadeInUp delay-300">
                <div className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold text-lg">Welcome Back! Your Perfect Match Awaits</span>
                  <Heart className="w-6 h-6 fill-white" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp delay-400">
                <Link to="/matches" className="btn-primary">
                  <Search className="w-5 h-5" />
                  <span>Discover Matches</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link to="/profile/me" className="btn-secondary">
                  <UserCheck className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
                
                <Link to="/membership" className="btn-primary bg-gradient-to-r from-amber-500 to-orange-500">
                  <Crown className="w-5 h-5" />
                  <span>Membership</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp delay-300">
                <Link to="/register" className="btn-primary">
                  <Sparkles className="w-5 h-5" />
                  <span>Start Free Today</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link to="/login" className="btn-secondary">
                  <Lock className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 animate-fadeInUp delay-400">
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
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
            {[
              { number: "100K+", label: "Active Members", icon: Users },
              { number: "50K+", label: "Success Stories", icon: Heart },
              { number: "95%", label: "Match Success", icon: TrendingUp },
              { number: "24/7", label: "Support", icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="card text-center animate-scaleIn" style={{animationDelay: `${index * 100}ms`}}>
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI-POWERED KUNDLI MATCHING SECTION */}
      <div className="bg-gradient-to-b from-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-orange-500 text-white px-6 py-2 rounded-full font-semibold mb-6">
              <Brain className="w-5 h-5" />
              <span>Powered by AI & Vedic Astrology</span>
              <Cpu className="w-5 h-5" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">AI-Powered Kundli</span>
              <br />
              <span className="text-gray-800">Matching System</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check astrological compatibility with your liked partners using our revolutionary AI-driven Kundli analysis.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Features */}
            <div className="card animate-slideInLeft">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Instant AI Analysis
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: Star, text: "36-Point Guna Milan Analysis" },
                  { icon: Moon, text: "Manglik Dosha Detection" },
                  { icon: Sun, text: "Planetary Position Insights" },
                  { icon: Infinity, text: "Dasha Compatibility Check" },
                  { icon: BarChart3, text: "AI-Powered Ashtakoota Matching" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                    <feature.icon className="w-6 h-6 text-orange-600" />
                    <span className="font-medium text-gray-700">{feature.text}</span>
                    <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>99.9% AI Accuracy Rate</span>
                </div>
              </div>
            </div>
            
            {/* Right: Benefits */}
            <div className="space-y-4 animate-slideInRight">
              {[
                {
                  icon: Brain,
                  title: "Advanced AI Intelligence",
                  description: "Our neural network analyzes 10,000+ astrological data points in milliseconds."
                },
                {
                  icon: Zap,
                  title: "Lightning Fast Results",
                  description: "Get comprehensive Kundli matching reports instantly with any liked profile."
                },
                {
                  icon: Shield,
                  title: "100% Private & Secure",
                  description: "Your birth details and astrological data are encrypted with military-grade security."
                },
                {
                  icon: Award,
                  title: "Expert Verified System",
                  description: "Developed with renowned Vedic astrologers and validated by AI experts."
                }
              ].map((feature, idx) => (
                <div key={idx} className="card">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section - Updated */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why We're <span className="gradient-text">The Best</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most advanced, secure, and successful matrimonial platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: "Secure Chat Platform",
                description: "Military-grade end-to-end encryption for all conversations. Share photos, videos, and voice messages in a private, AI-moderated environment.",
                badge: "Military Grade"
              },
              {
                icon: Shield,
                title: "100% Verified Profiles",
                description: "Every profile undergoes AI-powered verification with photo checks, ID proof, and background screening. Zero fake profiles guaranteed.",
                badge: "AI Verified"
              },
              {
                icon: Star,
                title: "AI Kundli Matching",
                description: "Revolutionary AI-enhanced Vedic astrology matching with instant Guna Milan, Manglik analysis, and planetary compatibility reports.",
                badge: "AI Enhanced"
              },
              {
                icon: Crown,
                title: "Premium Benefits",
                description: "Unlock unlimited messaging, advanced AI filters, profile boosting, priority support, and exclusive matchmaking concierge service.",
                badge: "VIP Access"
              }
            ].map((feature, index) => (
              <div key={index} className="card animate-scaleIn" style={{animationDelay: `${index * 100}ms`}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {feature.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Ad Section - Made Clickable */}
          <div className="mt-20 space-y-8">
            <a 
              href="https://your-actual-course-website.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="text-center text-white">
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full text-sm">
                      LIMITED TIME OFFER
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">
                    VIEW ALL COURSES
                  </h3>
                  <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-3">
                    HUGE MEXECON
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold mb-6">
                    WONSTER IS HERE
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuyNow();
                    }}
                    className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full text-xl transition-colors"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </a>
            
            {/* Ad container */}
            <div id="ad-container" className="flex justify-center"></div>

            {/* Facilities Section */}
            <div className="card">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Premium Facilities
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                  We provide AI-powered matching systems, certified relationship counselors, 24/7 premium support, 
                  military-grade security infrastructure, and a dedicated matchmaking concierge team to ensure 
                  the best experience for every member on their journey to finding true love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-2 rounded-full font-semibold mb-6">
              <Heart className="w-5 h-5 fill-white" />
              <span>Real Love Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Happily Ever After <span className="gradient-text">Starts Here</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who found their soulmate through AI-powered matching
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael",
                location: "Mumbai, India",
                text: "The AI Kundli matching gave us confidence in our compatibility! The predictions were incredibly accurate. We're planning our dream wedding now!",
                date: "Married Dec 2023",
                rating: 5
              },
              {
                name: "Priya & Raj",
                location: "Delhi, India",
                text: "After using the AI matching system for 2 months, we found each other! The compatibility score was 98%. Our families are thrilled!",
                date: "Married Jan 2024",
                rating: 5
              },
              {
                name: "Emma & James",
                location: "Bangalore, India",
                text: "The premium AI matchmaking service is worth every penny! Got personalized Kundli analysis and met my perfect match within weeks!",
                date: "Engaged Feb 2024",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="card animate-scaleIn" style={{animationDelay: `${index * 100}ms`}}>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic text-center">
                  "{testimonial.text}"
                </p>
                
                <div className="text-center pt-4 border-t">
                  <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                  <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl p-12 md:p-16 text-center shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Perfect Match is
              <br />
              <span className="text-yellow-300">Just One Click Away!</span>
            </h2>
            <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto">
              Join India's #1 AI-Powered Matrimonial Platform. Over 1,000 marriages happen every month!
            </p>
            
            {!loggedIn ? (
              <div className="space-y-6">
                <Link to="/register" className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                  <Sparkles className="w-6 h-6" />
                  <span>Start Your Journey Free</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>2 Million+ Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>100% Free to Join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span>AI-Powered Matching</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/matches" className="inline-flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                  <Search className="w-6 h-6" />
                  <span>Find Your Match</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
                
                <Link to="/membership" className="inline-flex items-center justify-center gap-3 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                  <Crown className="w-6 h-6" />
                  <span>Upgrade to Premium</span>
                  <Sparkles className="w-6 h-6" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Find Your Forever
            </h3>
            <p className="text-gray-400 mb-6">
              © 2025 Matrimonial. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with ❤️ using AI for bringing souls together
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}