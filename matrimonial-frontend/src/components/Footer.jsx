// matrimonial-frontend/src/components/Footer.jsx
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    {/* Top Section - Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Company Info */}
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-center md:justify-start space-x-3">
                                    <Phone className="w-5 h-5 text-blue-400" />
                                    <a 
                                        href="tel:+916289538865" 
                                        className="text-gray-300 hover:text-white transition-colors text-base"
                                    >
                                        +91 6289 538 865
                                    </a>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-3">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <a 
                                        href="mailto:support@bokmap.com" 
                                        className="text-gray-300 hover:text-white transition-colors text-sm"
                                    >
                                        contactcouplemarriage@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-3">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                    <span className="text-gray-300 text-sm">
                                        135, BB Ganguly Street, Sealdah
                                        Kolkata - 700012
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="text-center md:text-left">
                            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                                    About Us
                                </a>
                                <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                                    Contact
                                </a>
                                <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                                    Privacy Policy
                                </a>
                                <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                                    Terms of Service
                                </a>
                                <a href="/help" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                                    Help & Support
                                </a>
                                <a href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                                    FAQ
                                </a>
                            </div>
                        </div>

                        {/* Powered By Section */}
                        <div className="text-center md:text-right">
                            <h3 className="text-white font-bold text-lg mb-4">Powered By</h3>
                            <div className="flex flex-col items-center md:items-end space-y-3">
                                <span className="text-white font-bold text-xl bg-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                                    BokMap Services Pvt Ltd
                                </span>
                                <p className="text-gray-400 text-sm max-w-xs">
                                    Your trusted partner in finding meaningful relationships and lifelong partnerships.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Copyright */}
                    <div className="pt-6 border-t border-gray-700">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            {/* Copyright */}
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <p className="text-gray-400 text-sm">
                                    © {new Date().getFullYear()} Couple Marriage Matrimonial App. All rights reserved.
                                </p>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="text-center">
                                <p className="text-gray-500 text-xs">
                                    Made with ❤️ for bringing hearts together
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action - Mobile */}
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg md:hidden">
                        <div className="text-center">
                            <p className="text-white font-semibold mb-2">Need Help? Call Us Now!</p>
                            <a 
                                href="tel:+916289538865" 
                                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                <span>+91 6289 538 865</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;