// matrimonial-frontend/src/components/Footer.jsx
import React from 'react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Heart, 
    ArrowRight, 
    Shield,
    Award
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
                        
                        {/* Contact Us Section */}
                        <div className="lg:col-span-1">
                            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                                Contact Us
                                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
                            </h3>
                            <div className="space-y-4">
                                <a 
                                    href="tel:+916289538865" 
                                    className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1"
                                >
                                    <div className="mt-1 p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                        <Phone className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Call Us</p>
                                        <p className="text-gray-200 hover:text-white transition-colors font-medium">
                                            +91 6289 538 865
                                        </p>
                                    </div>
                                </a>
                                
                                <a 
                                    href="mailto:contactcouplemarriage@gmail.com" 
                                    className="flex items-start gap-3 group transition-all duration-300 hover:translate-x-1"
                                >
                                    <div className="mt-1 p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                        <Mail className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Email Us</p>
                                        <p className="text-gray-200 hover:text-white transition-colors font-medium break-all text-sm">
                                            contactcouplemarriage@gmail.com
                                        </p>
                                    </div>
                                </a>
                                
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 p-2 bg-blue-500/10 rounded-lg">
                                        <MapPin className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Visit Us</p>
                                        <p className="text-gray-200 font-medium text-sm leading-relaxed">
                                            135, BB Ganguly Street,<br />
                                            Sealdah, Kolkata - 700012
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                                Quick Links
                                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a 
                                        href="/about" 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="/contact" 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="/privacy" 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="/terms" 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Terms of Service</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="/help" 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">Help & Support</span>
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="/faq" 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">FAQ</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Powered By Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                                Powered By
                                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
                            </h3>
                            
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Award className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-bold shadow-lg">
                                        BokMap Services Pvt Ltd
                                    </div>
                                </div>
                                
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Your trusted partner in finding meaningful relationships and lifelong partnerships.
                                </p>

                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    <span className="text-gray-400">Trusted by 2M+ users across India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action - Mobile Only */}
                <div className="pb-8 md:hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl shadow-xl">
                        <div className="text-center">
                            <p className="text-white font-bold text-lg mb-4">Need Help? Call Us Now!</p>
                            <a 
                                href="tel:+916289538865" 
                                className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <Phone className="w-5 h-5" />
                                <span>+91 6289 538 865</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Copyright */}
                <div className="border-t border-gray-700 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} Couple Marriage Matrimonial App. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                            <span>for bringing hearts together</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;