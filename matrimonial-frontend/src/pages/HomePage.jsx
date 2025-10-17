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
  Search,
  UserCheck,
  Lock,
  TrendingUp,
  Award,
  Clock,
  Brain,
  Zap,
  BarChart3,
  Target,
  Cpu
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
      <style>{`
        @keyframes float-heart {
          0% { 
            transform: translateY(100vh) rotate(0deg) scale(0.5); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.7; 
          }
          90% { 
            opacity: 0.7; 
          }
          100% { 
            transform: translateY(-100px) rotate(360deg) scale(1.2); 
            opacity: 0; 
          }
        }
        
        .animate-float-heart {
          animation: float-heart linear infinite;
          pointer-events: none;
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(219, 39, 119, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(219, 39, 119, 0.6), 
                       0 0 60px rgba(192, 38, 211, 0.4);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes slideFadeUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-slide-fade-up {
          animation: slideFadeUp 0.8s ease-out forwards;
        }

        @keyframes fadeDelay {
          0%, 40% { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-delay {
          animation: fadeDelay 1.2s ease-in-out forwards;
        }

        @keyframes wiggleSlight {
          0%, 100% { 
            transform: rotate(0); 
          }
          50% { 
            transform: rotate(1deg); 
          }
        }
        
        .animate-wiggle-slight {
          animation: wiggleSlight 0.4s ease-in-out;
        }

        html { 
          scroll-behavior: smooth; 
        }
      `}</style>

      {/* Floating Background Hearts - Enhanced Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              fontSize: `${8 + Math.random() * 12}px`
            }}
          >
            <Heart 
              className="text-rose-200 opacity-40" 
              fill="currentColor" 
              style={{
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`
              }}
            />
          </div>
        ))}
      </div>

      {/* Android App Banner */}
      {showAppBanner && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5" />
                <span className="font-semibold">Android App Coming Soon</span>
                <span className="hidden sm:inline text-emerald-100 text-sm">
                  Get ready for mobile experience
                </span>
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
      <div className="relative bg-gradient-to-br from-rose-50 to-purple-50">
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-24' : 'pt-20'} pb-16`}>
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 animate-slide-fade-up">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">A</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white">I</div>
              </div>
              <span className="font-semibold text-gray-700">
                40,000+ Happy Couples
              </span>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-fade-up">
              <span className="block bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Find Your Perfect
              </span>
              <span className="block text-gray-800">Life Partner</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-delay">
              Where meaningful connections turn into beautiful relationships. 
              Start your journey to forever today with India's most trusted matrimonial platform.
            </p>
          </div>
          
          {/* CTA Buttons */}
          {loggedIn ? (
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Welcome back! Ready to find love?</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/matches" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300 hover:scale-105 animate-pulse-glow"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Search className="w-5 h-5" />
                    <span>Browse Matches</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <Link 
                  to="/profile/me" 
                  className="group px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                    <span>My Profile</span>
                  </div>
                </Link>
                
                <Link 
                  to="/membership" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Crown className="w-5 h-5" />
                    <span>Membership</span>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/register" 
                  className="group relative px-10 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300 hover:scale-105 animate-pulse-glow"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Start Free Today</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                
                <Link 
                  to="/login" 
                  className="group px-10 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Lock className="w-5 h-5 text-purple-600" />
                    <span>Sign In</span>
                  </div>
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { number: "40K+", label: "Active Members", icon: Users },
              { number: "38K+", label: "Success Stories", icon: Heart },
              { number: "95%", label: "Match Success", icon: TrendingUp },
              { number: "24/7", label: "Support", icon: Clock }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Kundli Integration Section */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-full font-bold mb-6 shadow-lg">
              <Brain className="w-6 h-6" />
              <span>Revolutionary AI Kundli Matching</span>
              <Zap className="w-6 h-6" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Ancient Wisdom Meets <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Modern AI</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the world's first AI-powered Vedic astrology matching system that combines 
              5000+ years of astrological wisdom with cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: AI Stats */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-orange-600" />
                  AI-Powered Analysis
                </h3>
                
                <div className="space-y-4">
                  {[
                    { icon: BarChart3, text: "36-Point Guna Milan Analysis", value: "98.8% Accuracy" },
                    { icon: Target, text: "Manglik Dosha Detection", value: "AI Verified" },
                    { icon: Zap, text: "Planetary Position Insights", value: "Real-time" },
                    { icon: Brain, text: "Compatibility Prediction", value: "Machine Learning" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <item.icon className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="font-semibold text-gray-800">{item.text}</span>
                      </div>
                      <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Vedic Astrology Benefits */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Why Vedic Astrology Matters</h3>
                <p className="text-amber-100 leading-relaxed mb-6">
                  Our AI system analyzes birth charts based on ancient Vedic principles to ensure 
                  perfect compatibility for lifelong happiness and harmony.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">36+</div>
                    <div className="text-amber-100 text-sm">Guna Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">12</div>
                    <div className="text-amber-100 text-sm">Houses Analysis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">9</div>
                    <div className="text-amber-100 text-sm">Planets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">27</div>
                    <div className="text-amber-100 text-sm">Nakshatras</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                <h4 className="text-lg font-bold mb-4 text-gray-900">AI Analysis Benefits</h4>
                <div className="space-y-3">
                  {[
                    "Instant compatibility scoring",
                    "Dosha detection & remedies",
                    "Planetary alignment insights",
                    "Future prediction models",
                    "Personalized matching algorithms"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10K+", label: "Data Points Analyzed", icon: Cpu, color: "blue" },
              { number: "98.9%", label: "AI Accuracy Rate", icon: TrendingUp, color: "green" },
              { number: "0.5s", label: "Analysis Time", icon: Zap, color: "yellow" },
              { number: "15K+", label: "Successful Matches", icon: Heart, color: "rose" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <stat.icon className={`w-10 h-10 mx-auto mb-3 text-${stat.color}-600`} />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the most trusted and sophisticated matrimonial platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: MessageCircle,
              title: "Secure Communication",
              description: "Connect with matches through our encrypted messaging platform. Your conversations are private and protected with end-to-end encryption.",
              gradient: "from-purple-500 to-indigo-600"
            },
            {
              icon: Shield,
              title: "Verified Profiles",
              description: "Every profile undergoes thorough verification with photo checks and ID proof. We ensure authenticity and safety for all our members.",
              gradient: "from-blue-500 to-cyan-600"
            },
            {
              icon: Star,
              title: "Kundli Matching",
              description: "Advanced astrological compatibility analysis with instant Guna Milan and comprehensive birth chart matching for perfect compatibility.",
              gradient: "from-orange-500 to-red-600"
            },
            {
              icon: Crown,
              title: "Premium Benefits",
              description: "Unlock unlimited messaging, advanced filters, profile boosting, and priority customer support with our premium membership.",
              gradient: "from-amber-500 to-yellow-600"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300 p-8 hover:scale-105"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ad Section */}
        <div className="mt-20 space-y-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                VIEW ALL COURSES
              </h3>
              <div className="text-3xl md:text-4xl font-extrabold text-yellow-300 mb-4">
                HUGE MEXECON
              </div>
              <div className="text-xl md:text-2xl font-bold text-white mb-6">
                WONSTER IS HERE
              </div>
              <button 
                onClick={handleBuyNow}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                BUY NOW
              </button>
            </div>
          </div>
          
          {/* Ad container */}
          <div id="ad-container" className="flex justify-center">
            {/* Ad will be loaded here */}
          </div>

          {/* Facilities Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Our Facilities</h4>
            </div>
            <p className="text-gray-600 text-center text-lg leading-relaxed max-w-4xl mx-auto">
              We provide well-equipped matching systems, certified relationship counselors, 24/7 customer support, 
              and dedicated matchmaking services to ensure the best experience for every member.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real couples who found their perfect match
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael",
                location: "Mumbai",
                text: "The platform helped us find each other! The matching algorithm really understands compatibility.",
                date: "Married 2023"
              },
              {
                name: "Priya & Raj",
                location: "Delhi",
                text: "After months of searching, we finally found our perfect match. Thank you for bringing us together!",
                date: "Married 2023"
              },
              {
                name: "Emma & James",
                location: "Bangalore",
                text: "The verification process made us feel safe. We're now planning our dream wedding together!",
                date: "Engaged 2024"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:animate-wiggle-slight">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed text-center">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                  <p className="text-sm text-purple-600 font-semibold">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-12 text-center shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Soulmate?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of happy couples who found their perfect match through our platform
          </p>
          
          {!loggedIn ? (
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/matches" 
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span>Find Matches</span>
              </Link>
              
              <Link 
                to="/membership" 
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300"
              >
                <Crown className="w-5 h-5" />
                <span>Go Premium</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2025 Matrimonial. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with care for bringing people together
          </p>
        </div>
      </footer>
    </div>
  );
}