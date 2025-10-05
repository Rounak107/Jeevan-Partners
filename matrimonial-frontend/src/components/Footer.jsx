// matrimonial-frontend/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Copyright and powered by text */}
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} Matrimonial App. All rights reserved.
                            </p>
                        </div>
                        
                        {/* Powered by section - Increased size */}
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-400 text-base">Powered by</span>
                            <span className="text-white font-bold text-lg bg-blue-600 px-4 py-2 rounded-lg shadow-lg">
                                BokMap Services Pvt Ltd
                            </span>
                        </div>
                    </div>
                    
                    {/* Additional footer links (optional) */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex flex-wrap justify-center space-x-6">
                            <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                                About Us
                            </a>
                            <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Contact
                            </a>
                            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </a>
                            <a href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Help & Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;