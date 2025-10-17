import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-rose-50 to-white border-t-4 border-rose-300 mt-auto">
            {/* Decorative Top Border */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12">
                    {/* Ornamental Divider */}
                    <div className="flex items-center justify-center mb-10">
                        <div className="h-px bg-rose-300 flex-grow max-w-xs"></div>
                        <Heart className="w-6 h-6 text-rose-400 mx-4 fill-rose-200" />
                        <div className="h-px bg-rose-300 flex-grow max-w-xs"></div>
                    </div>

                    {/* Top Section - Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
                        {/* Contact Info */}
                        <div className="text-center md:text-left">
                            <h3 className="text-rose-900 font-serif text-2xl mb-6 tracking-wide">
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start justify-center md:justify-start space-x-3 group">
                                    <div className="bg-rose-100 p-2 rounded-full group-hover:bg-rose-200 transition-colors">
                                        <Phone className="w-4 h-4 text-rose-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Call Us</p>
                                        <a 
                                            href="tel:+916289538865" 
                                            className="text-gray-700 hover:text-rose-600 transition-colors text-base font-medium"
                                        >
                                            +91 6289 538 865
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start justify-center md:justify-start space-x-3 group">
                                    <div className="bg-rose-100 p-2 rounded-full group-hover:bg-rose-200 transition-colors">
                                        <Mail className="w-4 h-4 text-rose-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email Us</p>
                                        <a 
                                            href="mailto:contactcouplemarriage@gmail.com" 
                                            className="text-gray-700 hover:text-rose-600 transition-colors text-sm font-medium break-all"
                                        >
                                            contactcouplemarriage@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start justify-center md:justify-start space-x-3 group">
                                    <div className="bg-rose-100 p-2 rounded-full group-hover:bg-rose-200 transition-colors">
                                        <MapPin className="w-4 h-4 text-rose-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Visit Us</p>
                                        <span className="text-gray-700 text-sm leading-relaxed">
                                            135, BB Ganguly Street, Sealdah<br />
                                            Kolkata - 700012
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="text-center">
                            <h3 className="text-rose-900 font-serif text-2xl mb-6 tracking-wide">
                                Explore
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="/about" className="text-gray-600 hover:text-rose-600 text-sm transition-all hover:translate-x-1 block py-2 font-medium">
                                    About Us
                                </a>
                                <a href="/contact" className="text-gray-600 hover:text-rose-600 text-sm transition-all hover:translate-x-1 block py-2 font-medium">
                                    Contact
                                </a>
                                <a href="/privacy" className="text-gray-600 hover:text-rose-600 text-sm transition-all hover:translate-x-1 block py-2 font-medium">
                                    Privacy Policy
                                </a>
                                <a href="/terms" className="text-gray-600 hover:text-rose-600 text-sm transition-all hover:translate-x-1 block py-2 font-medium">
                                    Terms of Service
                                </a>
                                <a href="/help" className="text-gray-600 hover:text-rose-600 text-sm transition-all hover:translate-x-1 block py-2 font-medium">
                                    Help & Support
                                </a>
                                <a href="/faq" className="text-gray-600 hover:text-rose-600 text-sm transition-all hover:translate-x-1 block py-2 font-medium">
                                    FAQ
                                </a>
                            </div>
                        </div>

                        {/* Powered By Section */}
                        <div className="text-center md:text-right">
                            <h3 className="text-rose-900 font-serif text-2xl mb-6 tracking-wide">
                                Powered By
                            </h3>
                            <div className="flex flex-col items-center md:items-end space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg blur opacity-30"></div>
                                    <span className="relative block text-rose-900 font-serif font-bold text-xl bg-white border-2 border-rose-300 px-6 py-4 rounded-lg shadow-lg hover:shadow-xl hover:border-rose-400 transition-all">
                                        BokMap Services Pvt Ltd
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm max-w-xs italic leading-relaxed">
                                    Your trusted partner in finding meaningful relationships and lifelong partnerships.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Ornamental Divider */}
                    <div className="flex items-center justify-center my-8">
                        <div className="h-px bg-rose-300 flex-grow max-w-md"></div>
                        <div className="flex space-x-2 mx-4">
                            <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                            <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                        </div>
                        <div className="h-px bg-rose-300 flex-grow max-w-md"></div>
                    </div>

                    {/* Bottom Section - Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="text-center md:text-left">
                            <p className="text-gray-600 text-sm font-medium">
                                © {new Date().getFullYear()} Couple Marriage - Find Your Perfect Match. All rights reserved.
                            </p>
                        </div>
                        
                        {/* Additional Info */}
                        <div className="text-center flex items-center space-x-2">
                            <span className="text-gray-500 text-sm">Made with</span>
                            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                            <span className="text-gray-500 text-sm">for bringing hearts together</span>
                        </div>
                    </div>

                    {/* Call to Action - Mobile */}
                    <div className="mt-8 md:hidden">
                        <div className="bg-gradient-to-r from-rose-100 to-pink-100 border-2 border-rose-300 rounded-2xl p-6 shadow-lg">
                            <div className="text-center">
                                <p className="text-rose-900 font-serif text-lg mb-4 font-bold">Need Assistance?</p>
                                <a 
                                    href="tel:+916289538865" 
                                    className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-md hover:shadow-xl transform hover:scale-105"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>+91 6289 538 865</span>
                                </a>
                                <p className="text-gray-600 text-xs mt-3">Available to help you find your perfect match</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Decorative Border */}
            <div className="w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400"></div>
        </footer>
    );
};

export default Footer;