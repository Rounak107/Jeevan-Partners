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
  Award,
  Lock,
  Zap,
  Clock,
  Globe,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const [showAppBanner, setShowAppBanner] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Heart,
      gradient: "from-rose-500 to-pink-600",
      title: "AI-Powered Matching",
      description: "Advanced algorithm analyzes 50+ compatibility factors including values, lifestyle, and life goals for perfect matches."
    },
    {
      icon: Star,
      gradient: "from-amber-500 to-yellow-600",
      title: "Kundli Matching",
      description: "Traditional horoscope compatibility with modern technology. Check Ashtakoot, Mangal Dosha, and planetary positions."
    },
    {
      icon: Shield,
      gradient: "from-emerald-500 to-teal-600",
      title: "100% Verified Profiles",
      description: "Every profile undergoes manual verification. Government ID, phone, and photo verification for complete authenticity."
    },
    {
      icon: MessageCircle,
      gradient: "from-purple-500 to-indigo-600",
      title: "Secure Messaging",
      description: "End-to-end encrypted conversations. Connect safely with matches while maintaining complete privacy."
    },
    {
      icon: Award,
      gradient: "from-blue-500 to-cyan-600",
      title: "Premium Features",
      description: "Advanced filters, unlimited messaging, profile highlights, and priority customer support for premium members."
    },
    {
      icon: Users,
      gradient: "from-fuchsia-500 to-pink-600",
      title: "Community Support",
      description: "Join relationship webinars, pre-marriage counseling, and connect with our success stories community."
    }
  ];

  const testimonials = [
    {
      name: "Ananya & Rohan",
      location: "Mumbai, India",
      text: "The Kundli matching feature gave our families confidence. We're happily married for 2 years now!",
      date: "Married Dec 2022",
      rating: 5
    },
    {
      name: "Priya & Arjun",
      location: "Delhi, India",
      text: "Found my soulmate within 3 months! The profile verification made me feel secure throughout the process.",
      date: "Married June 2023",
      rating: 5
    },
    {
      name: "Sneha & Vikram",
      location: "Bangalore, India",
      text: "The AI matching was spot on! We share the same values and dreams. Planning our wedding for next month!",
      date: "Engaged Jan 2024",
      rating: 5
    },
    {
      name: "Kavya & Aditya",
      location: "Hyderabad, India",
      text: "Best decision ever! The premium features helped us connect faster. Thank you for bringing us together!",
      date: "Married Aug 2023",
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, number: "2M+", label: "Active Members" },
    { icon: Heart, number: "500K+", label: "Success Stories" },
    { icon: Star, number: "98%", label: "Satisfaction Rate" },
    { icon: Globe, number: "150+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Android App Banner */}
      {showAppBanner && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3 flex-1">
                <Smartphone className="w-5 h-5" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-bold text-sm sm:text-base">📱 Android App Coming Soon!</span>
                  <span className="text-xs sm:text-sm text-emerald-100">Experience seamless matchmaking on mobile</span>
                </div>
              </div>
              <button
                onClick={() => setShowAppBanner(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 px-5 py-2.5 rounded-full shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-sm">Trusted by 2 Million+ Indians</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light max-w-4xl mx-auto leading-relaxed">
              Where traditions meet technology for meaningful relationships
            </p>
            
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Join India's most trusted matrimonial platform with AI matching & Kundli compatibility
            </p>
          </div>

          {/* CTA Buttons */}
          {loggedIn ? (
            <div className="flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-full shadow-lg">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold text-lg">Welcome back! Continue your journey ✨</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/matches" 
                  className="px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
                >
                  <Heart className="w-6 h-6" />
                  Browse Matches
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link 
                  to="/profile/me" 
                  className="px-8 py-4 bg-white text-gray-800 rounded-full font-bold text-lg shadow-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <Users className="w-6 h-6 text-purple-600" />
                  My Profile
                </Link>
                
                <Link 
                  to="/membership" 
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-300 transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
                >
                  <Crown className="w-6 h-6" />
                  Go Premium
                  <Sparkles className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
                >
                  <Sparkles className="w-6 h-6" />
                  Get Started Free
                  <ArrowRight className="w-6 h-6" />
                </Link>
                
                <Link 
                  to="/login" 
                  className="px-10 py-5 bg-white text-gray-800 rounded-full font-bold text-xl shadow-xl border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center"
                >
                  Sign In
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Free Registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Profiles</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-100 to-purple-50">
                    <stat.icon className="w-8 h-8 text-rose-600" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-purple-100 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">Premium Features</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-rose-900 bg-clip-text text-transparent">
              Why Choose Couple Marriage?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of traditional values and modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-rose-100 to-purple-50 mb-6">
                  <feature.icon className="w-8 h-8 text-rose-600" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kundli Matching Section */}
      <div className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-6">
                <Star className="w-5 h-5 text-amber-600" />
                <span className="text-amber-700 font-semibold">Traditional Meets Modern</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-900 via-orange-800 to-yellow-900 bg-clip-text text-transparent">
                Kundli Matching Made Simple
              </h2>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Check horoscope compatibility with your matches using our advanced Vedic astrology system. Get instant insights on:
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Ashtakoot Gun Milan (36 Points System)",
                  "Mangal Dosha Analysis",
                  "Planetary Positions & Dasha",
                  "Marriage Compatibility Score",
                  "Remedies & Suggestions"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              
              {loggedIn ? (
                <Link 
                  to="/matches" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-300 transition-all duration-300 hover:scale-105"
                >
                  <Star className="w-6 h-6" />
                  Check Kundli Match Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-300 transition-all duration-300 hover:scale-105"
                >
                  <Star className="w-6 h-6" />
                  Register to Check Compatibility
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-amber-200">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4 shadow-lg">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Compatibility Score
                  </h3>
                  <p className="text-gray-600">Based on Vedic Astrology</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Varna</span>
                      <span className="text-emerald-600 font-bold">1/1</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Vashya</span>
                      <span className="text-blue-600 font-bold">2/2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-4 rounded-2xl border border-purple-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Tara</span>
                      <span className="text-purple-600 font-bold">3/3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl border-2 border-amber-300 text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                      32/36
                    </div>
                    <p className="text-gray-700 font-semibold">Excellent Match!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <span className="text-purple-700 font-semibold">Success Stories</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 bg-clip-text text-transparent">
              Real Love Stories
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy couples who found their soulmates
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center">
                
                <div className="flex gap-1 justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>
                
                <div>
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 font-medium mb-1">
                    {testimonials[activeTestimonial].location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[activeTestimonial].date}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-gradient-to-r from-rose-500 to-purple-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-rose-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-white font-semibold">Start Your Journey Today</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Find Your Perfect Life Partner?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 2 million+ members and start your journey towards a beautiful relationship filled with love and happiness
          </p>

          {!loggedIn ? (
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/register" 
                className="px-10 py-5 bg-white text-purple-900 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 justify-center"
              >
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                Register for Free
                <ArrowRight className="w-6 h-6" />
              </Link>
              
              <Link 
                to="/login" 
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link 
              to="/membership" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-amber-300 transition-all duration-300 hover:scale-105"
            >
              <Crown className="w-6 h-6" />
              Upgrade to Premium
              <Sparkles className="w-6 h-6" />
            </Link>
          )}

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Couple Marriage</h3>
                  <p className="text-sm text-gray-400">Find Your Soulmate</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                India's most trusted matrimonial platform helping millions find their perfect life partner.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-rose-400 transition-colors">About Us</Link></li>
                <li><Link to="/membership" className="hover:text-rose-400 transition-colors">Membership</Link></li>
                <li><Link to="/success" className="hover:text-rose-400 transition-colors">Success Stories</Link></li>
                <li><Link to="/blog" className="hover:text-rose-400 transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>+91 1800-XXX-XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>support@couple.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 mt-1" />
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Couple Marriage. Made with <Heart className="w-4 h-4 inline text-rose-500 fill-rose-500" /> for bringing people together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}