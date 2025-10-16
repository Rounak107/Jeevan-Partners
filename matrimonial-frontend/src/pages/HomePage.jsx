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
  X
} from "lucide-react";

export default function HomePage() {
  const loggedIn = isLoggedIn();
  const [showAppBanner, setShowAppBanner] = React.useState(true);

  // Load ad scripts using useEffect
 useEffect(() => {
  // Create a container where the ads will load
  const adContainer = document.getElementById("ad-container");
  if (!adContainer) return;

  // Clean up existing ads (if re-rendered)
  adContainer.innerHTML = "";

  // === 1️⃣ First Script: JS SYNC (NO ADBLOCK BYPASS) ===
  const script1 = document.createElement("script");
  script1.type = "text/javascript";
  script1.src = "//pl27816842.effectivegatecpm.com/ae/43/d2/ae43d226a3be9560b9600b25ef141bcf.js";
  script1.async = true;
  adContainer.appendChild(script1);

  // === 2️⃣ Second Script Set ===
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

  // Cleanup when unmounting
  return () => {
    adContainer.innerHTML = "";
  };
}, []);

  const handleBuyNow = () => {
    // Replace with your actual course URL
    window.open('https://your-actual-course-website.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Android App Coming Soon Banner */}
      {showAppBanner && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span className="font-semibold">Android App Coming Soon!</span>
                <span className="hidden sm:inline">Get ready for a seamless mobile experience</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="hidden md:inline text-green-100 text-sm">
                  Stay tuned for the launch
                </span>
                <button
                  onClick={() => setShowAppBanner(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - FIXED PADDING */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showAppBanner ? 'pt-24' : 'pt-20'} pb-16`}>
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 100,000+ Happy Couples</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Find Your Perfect
              <br />
              Life Partner
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Where meaningful connections turn into beautiful relationships. 
              Start your journey to forever today.
            </p>
            
            {loggedIn ? (
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Welcome back! Ready to find love?</span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/matches" 
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Browse Matches</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/profile/me" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg"
                  >
                    <Users className="w-5 h-5" />
                    <span>My Profile</span>
                  </Link>
                  
                  {/* NEW MEMBERSHIP BUTTON */}
                  <Link 
                    to="/membership" 
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Crown className="w-5 h-5" />
                    <span>Membership</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/register" 
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Start Free Today</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg"
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
                
                <p className="text-sm text-gray-500">
                  No credit card required • Free forever • Cancel anytime
                </p>
              </div>
            )}
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
            {[
              { number: "100K+", label: "Active Users" },
              { number: "50K+", label: "Success Stories" },
              { number: "95%", label: "Match Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              color: "rose",
              title: "Smart Matching Algorithm",
              description: "Our AI-powered system finds compatible partners based on deep compatibility factors, values, and life goals."
            },
            {
              icon: MessageCircle,
              color: "purple",
              title: "Secure Communication",
              description: "Connect with matches through our encrypted messaging platform. Your conversations are private and protected."
            },
            {
              icon: Shield,
              color: "indigo",
              title: "Verified Profiles",
              description: "Every profile is manually verified. We ensure authenticity and safety for all our members."
            },
            {
              icon: Users,
              color: "pink",
              title: "Personalized Experience",
              description: "Set your preferences and let us curate matches that align with your expectations and lifestyle."
            },
            {
              icon: Star,
              color: "amber",
              title: "Success Stories",
              description: "Join thousands of couples who found their perfect match through our platform. Your story could be next."
            },
            {
              icon: Sparkles,
              color: "violet",
              title: "Premium Features",
              description: "Access advanced filters, priority support, and exclusive features to enhance your matchmaking journey."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-${feature.color}-100 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative gradient on hover */}
              <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl`}></div>
            </div>
          ))}
        </div>

        {/* Ad Banner - Added below Why Choose Us section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-xl">
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
          
          {/* Ad container - the scripts will populate this */}
          <div id="ad-container" className="mt-8 flex justify-center">
            {/* Ads will be loaded here by the scripts */}
          </div>

          {/* Facilities Section */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Facilities</h4>
            <p className="text-gray-600 text-center text-lg leading-relaxed">
              We provide well-equipped labs, experienced instructors, flexible class timings, and a supportive learning environment to ensure the best training experience for every student.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-purple-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Love Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real couples, real happiness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Michael",
                image: "👫",
                text: "We found each other on this platform and couldn't be happier. The matching algorithm really works!",
                date: "Married in 2023"
              },
              {
                name: "Priya & Raj",
                image: "💑",
                text: "After months of searching, we finally found our perfect match. Thank you for bringing us together!",
                date: "Married in 2023"
              },
              {
                name: "Emma & James",
                image: "👩‍❤️‍👨",
                text: "The verification process made us feel safe. We're now planning our dream wedding together!",
                date: "Engaged 2024"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4 text-center">{testimonial.image}</div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Soulmate?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join our community today and start your journey towards a beautiful relationship
            </p>
            
            {!loggedIn ? (
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/membership" 
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Crown className="w-5 h-5" />
                  <span>Upgrade to Premium</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Matrimonial. Made with ❤️ for bringing people together.
          </p>
        </div>
      </footer>
    </div>
  );
}