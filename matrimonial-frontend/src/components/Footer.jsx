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
    Sparkles
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 border-t border-rose-200 mt-auto overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 right-10 w-32 h-32 bg-rose-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-pink-200 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        
                        {/* Contact Us Section */}
                        <div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    Contact Us
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
                            </div>
                            
                            <div className="space-y-5">
                                <a 
                                    href="tel:+916289538865" 
                                    className="group block"
                                >
                                    <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300">
                                        <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl shadow-md">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Call Us</p>
                                            <p className="text-gray-800 font-semibold group-hover:text-rose-600 transition-colors">
                                                +91 6289 538 865
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                
                                <a 
                                    href="mailto:contactcouplemarriage@gmail.com" 
                                    className="group block"
                                >
                                    <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300">
                                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-md">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Email Us</p>
                                            <p className="text-gray-800 font-semibold group-hover:text-purple-600 transition-colors break-all text-sm">
                                                contactcouplemarriage@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                
                                <div className="block">
                                    <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-200">
                                        <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-md">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium mb-1">Visit Us</p>
                                            <p className="text-gray-800 font-semibold text-sm leading-relaxed">
                                                135, BB Ganguly Street,<br />
                                                Sealdah, Kolkata - 700012
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    Quick Links
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
                            </div>
                            
                            <ul className="space-y-3">
                                {[
                                    { href: '/about', label: 'About Us' },
                                    { href: '/contact', label: 'Contact' },
                                    { href: '/privacy', label: 'Privacy Policy' },
                                    { href: '/terms', label: 'Terms of Service' },
                                    { href: '/help', label: 'Help & Support' },
                                    { href: '/faq', label: 'FAQ' }
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.href} 
                                            className="group flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-all duration-300 py-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 group-hover:scale-125 transition-transform"></div>
                                            <span className="font-medium group-hover:translate-x-1 transition-transform">
                                                {link.label}
                                            </span>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Powered By Section */}
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    Powered By
                                </h3>
                                <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></div>
                            </div>
                            
                            <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border-2 border-rose-200 shadow-xl hover:shadow-2xl transition-all duration-500">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                                    <div className="p-4 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-2xl shadow-lg">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg mb-2">
                                            <Sparkles className="w-5 h-5" />
                                            BokMap Services Pvt Ltd
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">Premium Matrimonial Services</p>
                                    </div>
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Your trusted partner in finding meaningful relationships and lifelong partnerships.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-semibold text-gray-700">100% Verified</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-2 rounded-full border border-rose-200">
                                        <Heart className="w-5 h-5 text-rose-600" />
                                        <span className="text-sm font-semibold text-gray-700">2M+ Users</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-2 rounded-full border border-purple-200">
                                        <Award className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm font-semibold text-gray-700">Award Winning</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action - Mobile Only */}
                <div className="pb-8 md:hidden">
                    <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 p-8 rounded-3xl shadow-2xl">
                        <div className="text-center">
                            <div className="mb-4">
                                <Sparkles className="w-12 h-12 text-white mx-auto mb-3" />
                            </div>
                            <p className="text-white font-bold text-xl mb-6">Need Help? We're Here!</p>
                            <a 
                                href="tel:+916289538865" 
                                className="inline-flex items-center gap-3 bg-white text-rose-600 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
                            >
                                <Phone className="w-6 h-6" />
                                <span>+91 6289 538 865</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Copyright */}
                <div className="border-t-2 border-rose-200 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-600 font-medium">
                                © {new Date().getFullYear()} Couple Marriage Matrimonial App. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                            <span>Made with</span>
                            <div className="relative">
                                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                                <div className="absolute inset-0 bg-rose-400 blur-md opacity-50 animate-pulse"></div>
                            </div>
                            <span>for bringing hearts together</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;