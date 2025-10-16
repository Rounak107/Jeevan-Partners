// matrimonial-frontend/src/components/Footer.jsx
import React from 'react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Heart, 
    ArrowRight, 
    Shield, 
    Award,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    Send,
    CheckCircle
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-rose-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2">Stay Updated with Love Stories</h3>
                            <p className="text-white/90">Get weekly tips on finding your perfect match</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="px-6 py-3 rounded-full text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 min-w-[300px]"
                            />
                            <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group">
                                Subscribe
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Couple Marriage
                            </h2>
                            <p className="text-gray-600 text-sm">India's Most Trusted Matrimonial Platform</p>
                        </div>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Your trusted partner in finding meaningful relationships and lifelong partnerships. 
                            Join millions who found their soulmate through our AI-powered matching.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                                <Shield className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-semibold text-gray-700">100% Verified</span>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                <Award className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-semibold text-gray-700">Award Winning</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-rose-600 hover:to-purple-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-rose-600 hover:to-purple-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-rose-600 hover:to-purple-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-rose-600 hover:to-purple-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-rose-600 hover:to-purple-600 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            Quick Links
                            <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent"></div>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/about" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>About Us</span>
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Contact</span>
                                </a>
                            </li>
                            <li>
                                <a href="/help" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Help & Support</span>
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>FAQ</span>
                                </a>
                            </li>
                            <li>
                                <a href="/success-stories" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Success Stories</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            Legal
                            <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent"></div>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Privacy Policy</span>
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Terms of Service</span>
                                </a>
                            </li>
                            <li>
                                <a href="/cookies" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Cookie Policy</span>
                                </a>
                            </li>
                            <li>
                                <a href="/refund" className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span>Refund Policy</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            Contact Us
                            <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent"></div>
                        </h3>
                        <div className="space-y-4">
                            <a 
                                href="tel:+916289538865" 
                                className="flex items-start gap-3 group"
                            >
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-purple-600 transition-all duration-300">
                                    <Phone className="w-5 h-5 text-purple-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-gray-800 font-semibold group-hover:text-purple-600 transition-colors">
                                        +91 6289 538 865
                                    </p>
                                </div>
                            </a>
                            
                            <a 
                                href="mailto:contactcouplemarriage@gmail.com" 
                                className="flex items-start gap-3 group"
                            >
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-purple-600 transition-all duration-300">
                                    <Mail className="w-5 h-5 text-purple-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-800 font-semibold group-hover:text-purple-600 transition-colors break-all text-sm">
                                        contactcouplemarriage@gmail.com
                                    </p>
                                </div>
                            </a>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-gray-800 font-semibold">
                                        135, BB Ganguly Street,<br />
                                        Sealdah, Kolkata - 700012
                                    </p>
                                </div>
                            </div>

                            {/* Support Hours */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Support Hours</p>
                                    <p className="text-gray-800 font-semibold">
                                        24/7 Available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action - Mobile */}
                <div className="p-6 bg-gradient-to-r from-purple-50 to-rose-50 rounded-2xl md:hidden mb-8">
                    <div className="text-center">
                        <p className="text-gray-800 font-bold text-lg mb-3">Need Help? Call Us Now!</p>
                        <a 
                            href="tel:+916289538865" 
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <Phone className="w-5 h-5" />
                            <span>+91 6289 538 865</span>
                        </a>
                    </div>
                </div>

                {/* Powered By Section */}
                <div className="py-8 border-t border-gray-200">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Company Info */}
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <div className="text-center lg:text-left">
                                <p className="text-sm text-gray-500 mb-2">Powered by</p>
                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
                                    <Award className="w-5 h-5" />
                                    <span>BokMap Services Pvt Ltd</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">2M+</p>
                                <p className="text-sm text-gray-500">Active Users</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-rose-600">50K+</p>
                                <p className="text-sm text-gray-500">Success Stories</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">95%</p>
                                <p className="text-sm text-gray-500">Match Success</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-600 text-sm">
                                © {new Date().getFullYear()} Couple Marriage Matrimonial App. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span>for bringing hearts together</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;