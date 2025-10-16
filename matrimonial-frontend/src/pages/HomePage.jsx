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
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes subtleShimmer {
    0% { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
  
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
  .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
  .animate-subtle-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    background-size: 500px 100%;
    animation: subtleShimmer 4s infinite;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #e91e63, #9c27b0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`}</style>

      {/* Android App Coming Soon Banner */}
      {showAppBanner && (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span className="font-semibold text-sm">Android App Coming Soon</span>
          </div>
          <button
            onClick={() => setShowAppBanner(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Hero Section - Condensed */}
  <div className="relative bg-white">
    {/* Simplified Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-5 text-4xl opacity-5 animate-float">💍</div>
      <div className="absolute bottom-10 right-5 text-4xl opacity-5 animate-float" style={{animationDelay: '2s'}}>💝</div>
    </div>
    
    <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-8' : 'pt-16'} pb-16`}>
      {/* Trust Badge - Smaller */}
      <div className="text-center mb-6 animate-fadeInUp">
        <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full shadow-lg">
          <div className="flex -space-x-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 border border-white"></div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 border border-white"></div>
          </div>
          <span className="font-medium text-sm bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Trusted by 100,000+ Couples
          </span>
        </div>
      </div>
      
      {/* Main Headline - More Compact */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-fadeInUp">
          <span className="block gradient-text mb-1">Find Your Perfect</span>
          <span className="block text-gray-800">Life Partner</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          Where meaningful connections turn into beautiful relationships. 
          Start your journey to forever today.
        </p>
      </div>
      
      {/* CTA Buttons - More Compact */}
      {loggedIn ? (
        <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              to="/matches" 
              className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                <span>Discover Matches</span>
              </div>
            </Link>
            
            <Link 
              to="/profile/me" 
              className="group px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                <span>My Profile</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
            
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Sign In</span>
              </div>
            </Link>
          </div>
        </div>
      )}
      
      {/* Stats Section - More Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12">
        {[
          { number: "100K+", label: "Members" },
          { number: "50K+", label: "Success" },
          { number: "95%", label: "Success Rate" },
          { number: "24/7", label: "Support" }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
      
      {/* NEW: Kundli Matching Feature Section */}
      <div className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Kundli Matching Made Easy
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Check compatibility with advanced Kundli matching. Get insights on Guna Milan, Manglik Dosha, and more.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Left: Visual */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Instant Kundli Reports</h3>
          <div className="space-y-2">
            {[
              "36-Point Guna Milan",
              "Manglik Dosha Detection", 
              "Planetary Position Insights"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right: Features */}
      <div className="space-y-4">
        {[
          {
            icon: Star,
            title: "Accurate Predictions", 
            description: "99% accuracy in Kundli analysis using traditional Vedic methods."
          },
          {
            icon: Zap,
            title: "Instant Results",
            description: "Get comprehensive matching reports in seconds."
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
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
      
    </div>
  );
}