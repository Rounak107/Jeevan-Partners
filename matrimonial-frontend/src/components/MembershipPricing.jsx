import React, { useState, useEffect } from 'react';
import { Heart, Crown, Sparkles, Shield, Check, Phone, Mail, Star, Users } from 'lucide-react';

const MembershipPricing = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    const staticPlans = [
        {
            id: 'free',
            name: 'Free Plan',
            price: 0,
            currency: 'INR',
            duration: 'Lifetime',
            features: [
                'Browse profile cards only',
                'View basic profile information',
                'No access to detailed profiles',
                'Cannot send messages',
                'Cannot like profiles',
                'No AI Kundli access'
            ],
            popular: false,
            profileAccess: 'Cards Only',
            messaging: 'Not Available',
            likes: 'Not Available',
            aiKundli: 'Not Available',
            spotlight: 'Not Included',
            rmSupport: 'Not Included',
            profileHighlight: 'No',
            searchPriority: 'Basic',
            icon: '🌸'
        },
        {
            id: 'starter',
            name: 'Starter',
            price: 149,
            currency: 'INR',
            duration: '1 month',
            features: [
                'View complete profile details',
                'Access to contact information',
                'Like profiles unlimited',
                'Browse unlimited profiles',
                'Basic customer support',
                'Profile verification optional'
            ],
            popular: false,
            profileAccess: 'Full Access',
            messaging: 'Not Available',
            likes: 'Unlimited',
            aiKundli: 'Not Available',
            spotlight: 'Not Included',
            rmSupport: 'Not Included',
            profileHighlight: 'No',
            searchPriority: 'Standard',
            icon: '💐'
        },
        {
            id: 'essential',
            name: 'Essential',
            price: 399,
            currency: 'INR',
            duration: '3 months',
            features: [
                'All Starter features included',
                'Send messages (70 per day)',
                'Unlimited profile browsing',
                'Priority customer support',
                'Profile highlighting for 7 days',
                'Enhanced search priority'
            ],
            popular: true,
            profileAccess: 'Full Access',
            messaging: '70/day',
            likes: 'Unlimited',
            aiKundli: 'Not Available',
            spotlight: 'Not Included',
            rmSupport: 'Not Included',
            profileHighlight: '7 days',
            searchPriority: 'Enhanced',
            icon: '💝'
        },
        {
            id: 'popular',
            name: 'Popular',
            price: 1499,
            currency: 'INR',
            duration: '12 months',
            features: [
                'All Essential features included',
                'Full AI Kundli access',
                'Unlimited messaging (150/day)',
                'Advanced compatibility analysis',
                '1 Spotlight feature per month',
                'Premium customer support'
            ],
            popular: false,
            profileAccess: 'Full Access',
            messaging: '150/day',
            likes: 'Unlimited',
            aiKundli: 'Full Access',
            spotlight: '1 per month',
            rmSupport: 'Not Included',
            profileHighlight: '30 days',
            searchPriority: 'Premium',
            icon: '👑'
        },
        {
            id: 'premium',
            name: 'Premium Assisted',
            price: 3499,
            currency: 'INR',
            duration: '12 months',
            features: [
                'All Popular features included',
                '1 Spotlight every month',
                '1 month of assisted introductions',
                'Relationship Manager support',
                'Priority chat + phone support',
                'Money-back guarantee (if < 3 matches in 45 days)',
                'Curated matchmaking service'
            ],
            popular: false,
            profileAccess: 'Full Access +',
            messaging: 'Unlimited',
            likes: 'Unlimited',
            aiKundli: 'Full Access +',
            spotlight: '1 per month',
            rmSupport: 'Included',
            profileHighlight: 'Permanent',
            searchPriority: 'Top Priority',
            curatedMatches: '8-10 matches',
            icon: '💎'
        },
        {
            id: 'premium-plus',
            name: 'Premium Plus',
            price: 5999,
            currency: 'INR',
            duration: '12 months',
            features: [
                'All Premium Assisted features included',
                '1 Spotlight every month',
                '1 month of assisted introductions',
                'Dedicated Relationship Manager',
                'Priority chat + phone support',
                'Meet them together - RM will help conduct dating',
                'Personalized dating coordination',
                'Date planning and logistics support',
                'Post-date feedback sessions',
                'Money-back guarantee (if < 3 quality matches in 45 days)'
            ],
            popular: false,
            profileAccess: 'Full Access ++',
            messaging: 'Unlimited',
            likes: 'Unlimited',
            aiKundli: 'Full Access ++',
            spotlight: '1 per month +',
            rmSupport: 'Dedicated RM',
            profileHighlight: 'Permanent VIP',
            searchPriority: 'VIP Priority',
            curatedMatches: '10-12 quality matches',
            datingAssistance: 'Full Support',
            icon: '🚀'
        }
    ];

    useEffect(() => {
        setPlans(staticPlans);
        setLoading(false);
    }, []);

    const handleDirectPayment = (plan) => {
        if (plan.price === 0) {
            alert('Free plan selected! You can start using the free features immediately.');
            return;
        }
        
        setProcessingPayment(true);
        
        const payuUrl = `https://u.payu.in/xIIMzZL63pcG?plan=${plan.id}&amount=${plan.price}&plan_name=${encodeURIComponent(plan.name)}`;
        window.location.href = payuUrl;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500 absolute top-0"></div>
                    <Heart className="w-8 h-8 text-rose-500 absolute top-4 left-4 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 py-16 relative overflow-hidden">

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                    background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%);
                    background-size: 1000px 100%;
                }
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(255, 105, 180, 0.6); }
                }
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent flex-grow max-w-xs"></div>
                        <Heart className="w-8 h-8 text-rose-400 mx-4 fill-rose-200 animate-pulse" />
                        <div className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent flex-grow max-w-xs"></div>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-float">
                        Find Your Perfect Match
                    </h1>
                    
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Choose the right plan that matches your journey to finding love. 
                        Start free or upgrade for premium features and personalized assistance.
                    </p>
                    
                    {/* Quick Feature Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { icon: '👁️', label: 'View Profiles', color: 'from-rose-400 to-pink-400' },
                            { icon: '💬', label: 'Messaging', color: 'from-pink-400 to-purple-400' },
                            { icon: '🤖', label: 'AI Kundli', color: 'from-purple-400 to-indigo-400' },
                            { icon: '👥', label: 'Dating Help', color: 'from-amber-400 to-orange-400' }
                        ].map((feature, idx) => (
                            <div 
                                key={idx}
                                className="group text-center p-4 bg-white/80 rounded-2xl border-2 border-rose-100 hover:border-rose-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                                <div className={`font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                                    {feature.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Processing Overlay */}
                {processingPayment && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-4 border-4 border-rose-200">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200"></div>
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500 absolute top-0"></div>
                                    <Heart className="w-8 h-8 text-rose-500 absolute top-4 left-4 fill-rose-500 animate-pulse" />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-800 font-serif font-bold text-xl mb-2">Redirecting to Payment</p>
                                    <p className="text-gray-600">Taking you to secure PayU gateway...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                                plan.popular 
                                    ? 'ring-4 ring-rose-400 scale-105 shadow-rose-300/50' 
                                    : plan.id === 'premium-plus'
                                    ? 'animate-glow ring-4 ring-purple-500 scale-105 shadow-purple-300/50'
                                    : 'hover:shadow-2xl'
                            } bg-white/90 flex flex-col h-full border-2 border-rose-100`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {plan.popular && (
                                <>
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 animate-shimmer"></div>
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                                            <Crown className="w-4 h-4 fill-white" />
                                            <span>MOST POPULAR</span>
                                            <Crown className="w-4 h-4 fill-white" />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {plan.id === 'premium-plus' && (
                                <>
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 animate-shimmer"></div>
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                                            <Sparkles className="w-4 h-4 fill-white" />
                                            <span>VIP SERVICE</span>
                                            <Sparkles className="w-4 h-4 fill-white" />
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            <div className="p-6 flex-1 flex flex-col">
                                {/* Plan Icon */}
                                <div className="text-center mb-4">
                                    <div className="inline-block text-5xl mb-3 transform hover:scale-110 transition-transform">
                                        {plan.icon}
                                    </div>
                                </div>

                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center mb-2">
                                        <span className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                            ₹{plan.price}
                                        </span>
                                        {plan.duration && plan.price > 0 && (
                                            <span className="text-gray-500 ml-2 text-sm">
                                                /{plan.duration}
                                            </span>
                                        )}
                                    </div>
                                    {plan.price === 0 ? (
                                        <div className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            <Sparkles className="w-3 h-3" />
                                            <span>Free Forever</span>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            {plan.duration.includes('month') && !plan.duration.includes('12') ? 'Billed monthly' : 
                                             plan.duration.includes('3') ? 'Billed quarterly' : 
                                             plan.duration.includes('12') ? 'Billed annually' : 
                                             'One-time payment'}
                                        </p>
                                    )}
                                </div>

                                {/* Key Features Badges */}
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    <div className={`text-xs text-center p-2 rounded-lg border-2 ${
                                        plan.profileAccess.includes('Full') 
                                            ? plan.id === 'premium-plus'
                                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                                : 'bg-green-50 border-green-200 text-green-700'
                                            : 'bg-gray-50 border-gray-200 text-gray-500'
                                    }`}>
                                        <div className="font-semibold">👁️ Profiles</div>
                                        <div className="text-xs mt-1">{plan.profileAccess}</div>
                                    </div>
                                    <div className={`text-xs text-center p-2 rounded-lg border-2 ${
                                        plan.messaging !== 'Not Available' 
                                            ? plan.id === 'premium-plus'
                                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                                : 'bg-blue-50 border-blue-200 text-blue-700'
                                            : 'bg-gray-50 border-gray-200 text-gray-500'
                                    }`}>
                                        <div className="font-semibold">💬 Messages</div>
                                        <div className="text-xs mt-1">{plan.messaging}</div>
                                    </div>
                                    <div className={`text-xs text-center p-2 rounded-lg border-2 ${
                                        plan.likes !== 'Not Available' 
                                            ? plan.id === 'premium-plus'
                                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                                : 'bg-purple-50 border-purple-200 text-purple-700'
                                            : 'bg-gray-50 border-gray-200 text-gray-500'
                                    }`}>
                                        <div className="font-semibold">❤️ Likes</div>
                                        <div className="text-xs mt-1">{plan.likes}</div>
                                    </div>
                                    <div className={`text-xs text-center p-2 rounded-lg border-2 ${
                                        plan.aiKundli !== 'Not Available' 
                                            ? plan.id === 'premium-plus'
                                                ? 'bg-purple-50 border-purple-200 text-purple-700'
                                                : 'bg-orange-50 border-orange-200 text-orange-700'
                                            : 'bg-gray-50 border-gray-200 text-gray-500'
                                    }`}>
                                        <div className="font-semibold">🤖 AI</div>
                                        <div className="text-xs mt-1">{plan.aiKundli.includes('Not') ? 'No AI' : 'AI Kundli'}</div>
                                    </div>
                                </div>

                                {/* Special Dating Assistance Badge for Premium Plus */}
                                {plan.id === 'premium-plus' && (
                                    <div className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-200 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Users className="w-4 h-4 text-purple-600" />
                                            <span className="text-sm font-bold text-purple-700">Full Dating Assistance Included</span>
                                        </div>
                                    </div>
                                )}

                                {/* Features List */}
                                <div className="flex-1 mb-6">
                                    <div className="h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mb-4"></div>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start group">
                                                <div className={`rounded-full p-1 mr-3 flex-shrink-0 transition-colors ${
                                                    plan.id === 'premium-plus'
                                                        ? 'bg-purple-100 group-hover:bg-purple-200'
                                                        : 'bg-rose-100 group-hover:bg-rose-200'
                                                }`}>
                                                    <Check className={`w-3 h-3 ${
                                                        plan.id === 'premium-plus' ? 'text-purple-600' : 'text-rose-600'
                                                    }`} />
                                                </div>
                                                <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Select Button */}
                                <button
                                    onClick={() => handleDirectPayment(plan)}
                                    disabled={processingPayment}
                                    className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 mt-auto transform hover:scale-105 ${
                                        plan.popular
                                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                                            : plan.id === 'premium-plus'
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                                            : plan.price === 0
                                            ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
                                            : 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white shadow-md hover:shadow-lg'
                                    } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {processingPayment ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                            Redirecting...
                                        </div>
                                    ) : plan.price === 0 ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Sparkles className="w-5 h-5" />
                                            <span>Start Free</span>
                                        </div>
                                    ) : plan.id === 'premium-plus' ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Users className="w-5 h-5 fill-white" />
                                            <span>VIP Service - ₹{plan.price}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Heart className="w-5 h-5 fill-white" />
                                            <span>Choose Plan - ₹{plan.price}</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden mb-12 border-2 border-rose-100">
                    <div className="px-6 py-10 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10"></div>
                        <div className="relative z-10 text-center">
                            <div className="flex items-center justify-center mb-4">
                                <Star className="w-8 h-8 text-white fill-white animate-pulse" />
                                <h2 className="text-4xl font-serif font-bold text-white mx-4">
                                    Plan Comparison
                                </h2>
                                <Star className="w-8 h-8 text-white fill-white animate-pulse" />
                            </div>
                            <p className="text-white text-lg">
                                Compare features across all membership plans
                            </p>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-rose-50 to-pink-50">
                                    <th className="px-6 py-6 text-left text-sm font-serif font-bold text-gray-800 border-r border-rose-200 min-w-48">
                                        Features
                                    </th>
                                    {plans.map((plan) => (
                                        <th key={plan.id} className={`px-4 py-6 text-center border-r border-rose-200 min-w-52 ${
                                            plan.popular ? 'bg-rose-100' : plan.id === 'premium-plus' ? 'bg-purple-100' : ''
                                        }`}>
                                            <div className="text-2xl mb-2">{plan.icon}</div>
                                            <div className="text-lg font-serif font-bold text-gray-800">{plan.name}</div>
                                            <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mt-2">
                                                ₹{plan.price}
                                                {plan.price > 0 && <span className="text-sm text-gray-500">/{plan.duration.split(' ')[0]}</span>}
                                            </div>
                                            {plan.popular && (
                                                <span className="inline-flex items-center space-x-1 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                                                    <Crown className="w-3 h-3 fill-white" />
                                                    <span>Popular</span>
                                                </span>
                                            )}
                                            {plan.id === 'premium-plus' && (
                                                <span className="inline-flex items-center space-x-1 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                                                    <Sparkles className="w-3 h-3 fill-white" />
                                                    <span>VIP</span>
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-rose-100">
                                {[
                                    { label: '👁️ Profile Access', key: 'profileAccess', goodValue: 'Full' },
                                    { label: '💬 Messaging', key: 'messaging', goodValue: 'Not Available', inverse: true },
                                    { label: '❤️ Like Profiles', key: 'likes', goodValue: 'Not Available', inverse: true },
                                    { label: '🤖 AI Kundli', key: 'aiKundli', goodValue: 'Not Available', inverse: true },
                                    { label: '⭐ Spotlight', key: 'spotlight', goodValue: 'Not Included', inverse: true },
                                    { label: '👨‍💼 RM Support', key: 'rmSupport', goodValue: 'Included' },
                                    { label: '👥 Dating Assistance', key: 'datingAssistance', goodValue: 'Full Support' }
                                ].map((feature, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-rose-50/30' : 'bg-white'}>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-700 border-r border-rose-200">
                                            {feature.label}
                                        </td>
                                        {plans.map((plan) => (
                                            <td key={plan.id} className={`px-4 py-4 text-center text-sm font-semibold border-r border-rose-200 ${
                                                plan.popular ? 'bg-rose-50' : plan.id === 'premium-plus' ? 'bg-purple-50' : ''
                                            } ${
                                                feature.inverse 
                                                    ? plan[feature.key] !== feature.goodValue 
                                                        ? plan.id === 'premium-plus' ? 'text-purple-600 font-bold' : 'text-green-600'
                                                        : 'text-gray-400'
                                                    : plan[feature.key] && plan[feature.key].includes(feature.goodValue) 
                                                        ? plan.id === 'premium-plus' ? 'text-purple-600 font-bold' : 'text-green-600'
                                                        : 'text-gray-400'
                                            }`}>
                                                {plan[feature.key] || 'Not Available'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                
                                {/* Action Buttons Row */}
                                <tr className="bg-gradient-to-r from-rose-50 to-pink-50">
                                    <td className="px-6 py-6 text-sm font-serif font-bold text-gray-800 border-r border-rose-200">
                                        🎯 Get Started
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center border-r border-rose-200 ${
                                            plan.popular ? 'bg-rose-100' : plan.id === 'premium-plus' ? 'bg-purple-100' : ''
                                        }`}>
                                            <button
                                                onClick={() => handleDirectPayment(plan)}
                                                disabled={processingPayment}
                                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                                                    plan.popular
                                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg'
                                                        : plan.id === 'premium-plus'
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                                                        : plan.price === 0
                                                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                                                        : 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white'
                                                } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {plan.price === 0 ? 'Start Free' : `Pay ₹${plan.price}`}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Security Section */}
                <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-3xl p-10 mb-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-6">
                            <Shield className="w-10 h-10 text-white mr-3" />
                            <h3 className="text-3xl font-serif font-bold text-white">Secure Payment Guaranteed</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
                            {[
                                { icon: '🔒', title: 'PayU Secure', subtitle: '256-bit SSL Encryption' },
                                { icon: '💳', title: 'All Cards', subtitle: 'Credit & Debit Cards' },
                                { icon: '🏦', title: 'Net Banking', subtitle: 'All Major Banks' },
                                { icon: '⚡', title: 'Instant Access', subtitle: 'Immediate Activation' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center p-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-all">
                                    <div className="text-4xl mb-3">{item.icon}</div>
                                    <div className="font-bold text-lg">{item.title}</div>
                                    <div className="text-sm opacity-90">{item.subtitle}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white/90 rounded-3xl p-10 border-2 border-rose-100 shadow-xl mb-12">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center space-x-3 mb-4">
                            <div className="h-px bg-gradient-to-r from-transparent to-rose-300 w-16"></div>
                            <span className="text-4xl">💭</span>
                            <div className="h-px bg-gradient-to-l from-transparent to-rose-300 w-16"></div>
                        </div>
                        <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: '🔄',
                                question: 'Can I upgrade my plan later?',
                                answer: 'Yes, you can upgrade anytime. You\'ll only pay the difference for the remaining period.'
                            },
                            {
                                icon: '💰',
                                question: 'Is there a refund policy?',
                                answer: 'Premium and Premium Plus plans offer money-back guarantee if you get less than quality matches in 45 days.'
                            },
                            {
                                icon: '🤝',
                                question: 'What is Dating Assistance?',
                                answer: 'In Premium Plus, our Relationship Manager helps coordinate and conduct dating meetings for you.'
                            },
                            {
                                icon: '⭐',
                                question: 'What is Spotlight feature?',
                                answer: 'Spotlight puts your profile at the top of search results for 24 hours, increasing visibility.'
                            }
                        ].map((faq, idx) => (
                            <div 
                                key={idx} 
                                className="group p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border-2 border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl group-hover:scale-110 transition-transform">
                                        {faq.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif font-bold text-gray-800 mb-2 text-lg">
                                            {faq.question}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 rounded-3xl p-10 border-2 border-rose-200 shadow-xl">
                        <Heart className="w-16 h-16 text-rose-500 fill-rose-200 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                            Ready to Find Your Soulmate?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
                            Join thousands of happy couples who found their perfect match through our platform. 
                            Your journey to forever starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a 
                                href="tel:+916289538865"
                                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Call: +91 6289 538 865</span>
                            </a>
                            <a 
                                href="mailto:contactcouplemarriage@gmail.com"
                                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                <Mail className="w-5 h-5" />
                                <span>Email Us</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPricing;