import React, { useState, useEffect } from 'react';
import API from '../api'; 

const MembershipPricing = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    // Updated plans data based on new requirements
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
            searchPriority: 'Basic'
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
            searchPriority: 'Standard'
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
            searchPriority: 'Enhanced'
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
            searchPriority: 'Premium'
        },
        {
            id: 'premium',
            name: 'Premium Assisted',
            price: 3499,
            currency: 'INR',
            duration: '1 month',
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
            curatedMatches: '8-10 matches'
        }
    ];

    useEffect(() => {
        setPlans(staticPlans);
        setLoading(false);
    }, []);

    // Direct payment function
    const handleDirectPayment = (plan) => {
        if (plan.price === 0) {
            alert('Free plan selected! You can start using the free features immediately.');
            return;
        }
        
        setProcessingPayment(true);
        
        // Direct redirect to PayU with plan details
        const payuUrl = `https://u.payu.in/xIIMzZL63pcG?plan=${plan.id}&amount=${plan.price}&plan_name=${encodeURIComponent(plan.name)}`;
        window.location.href = payuUrl;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Find Your Perfect Match
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Choose the right plan that matches your journey to finding love. 
                        Start free or upgrade for premium features and personalized assistance.
                    </p>
                    
                    {/* Quick Feature Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        <div className="text-center p-4 bg-blue-800/30 rounded-lg">
                            <div className="text-2xl mb-2">👁️</div>
                            <div className="text-white font-semibold">View Profiles</div>
                        </div>
                        <div className="text-center p-4 bg-purple-800/30 rounded-lg">
                            <div className="text-2xl mb-2">💬</div>
                            <div className="text-white font-semibold">Messaging</div>
                        </div>
                        <div className="text-center p-4 bg-green-800/30 rounded-lg">
                            <div className="text-2xl mb-2">🤖</div>
                            <div className="text-white font-semibold">AI Kundli</div>
                        </div>
                        <div className="text-center p-4 bg-red-800/30 rounded-lg">
                            <div className="text-2xl mb-2">⭐</div>
                            <div className="text-white font-semibold">Spotlight</div>
                        </div>
                    </div>
                </div>

                {/* Payment Processing Overlay */}
                {processingPayment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <div>
                                    <p className="text-gray-800 font-semibold">Redirecting to Payment</p>
                                    <p className="text-gray-600 text-sm">Taking you to secure PayU gateway...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl shadow-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${
                                plan.popular 
                                    ? 'ring-4 ring-yellow-400 transform scale-105 border-yellow-400 shadow-yellow-500/25' 
                                    : 'border border-gray-700'
                            } bg-gray-800/80 backdrop-blur-sm flex flex-col h-full`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        ⭐ MOST POPULAR
                                    </span>
                                </div>
                            )}
                            
                            <div className="p-6 flex-1 flex flex-col">
                                {/* Plan Header */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center mb-2">
                                        <span className="text-4xl font-bold text-white">
                                            ₹{plan.price}
                                        </span>
                                        {plan.duration && plan.price > 0 && (
                                            <span className="text-gray-400 ml-2 text-sm">
                                                /{plan.duration}
                                            </span>
                                        )}
                                    </div>
                                    {plan.price === 0 ? (
                                        <p className="text-green-400 font-semibold">Free Forever</p>
                                    ) : (
                                        <p className="text-gray-400 text-sm">
                                            {plan.duration.includes('month') && !plan.duration.includes('12') ? 'Billed monthly' : 
                                             plan.duration.includes('3') ? 'Billed quarterly' : 
                                             plan.duration.includes('12') ? 'Billed annually' : 
                                             'One-time payment'}
                                        </p>
                                    )}
                                </div>

                                {/* Key Features Badges */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className={`text-xs text-center p-2 rounded ${
                                        plan.profileAccess.includes('Full') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                    }`}>
                                        👁️ {plan.profileAccess}
                                    </div>
                                    <div className={`text-xs text-center p-2 rounded ${
                                        plan.messaging !== 'Not Available' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'
                                    }`}>
                                        💬 {plan.messaging}
                                    </div>
                                    <div className={`text-xs text-center p-2 rounded ${
                                        plan.likes !== 'Not Available' ? 'bg-purple-500/20 text-purple-300' : 'bg-red-500/20 text-red-300'
                                    }`}>
                                        ❤️ {plan.likes}
                                    </div>
                                    <div className={`text-xs text-center p-2 rounded ${
                                        plan.aiKundli !== 'Not Available' ? 'bg-orange-500/20 text-orange-300' : 'bg-red-500/20 text-red-300'
                                    }`}>
                                        🤖 {plan.aiKundli.includes('Not') ? 'No AI' : 'AI Kundli'}
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="flex-1 mb-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <svg
                                                    className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Select Button */}
                                <button
                                    onClick={() => handleDirectPayment(plan)}
                                    disabled={processingPayment}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 mt-auto ${
                                        plan.popular
                                            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg hover:shadow-yellow-500/25'
                                            : plan.price === 0
                                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                                    } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {processingPayment ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Redirecting...
                                        </div>
                                    ) : plan.price === 0 ? (
                                        'Start Free'
                                    ) : (
                                        `Get Started - ₹${plan.price}`
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-8">
                    <div className="px-6 py-8 bg-gradient-to-r from-purple-600 to-blue-600">
                        <h2 className="text-3xl font-bold text-white text-center mb-2">
                            Plan Comparison
                        </h2>
                        <p className="text-blue-100 text-center text-lg">
                            Compare features across all membership plans
                        </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white border-r border-gray-600 min-w-48">
                                        Features
                                    </th>
                                    {plans.map((plan) => (
                                        <th key={plan.id} className={`px-4 py-4 text-center text-sm font-semibold text-white border-r border-gray-600 min-w-52 ${
                                            plan.popular ? 'bg-yellow-500/20' : ''
                                        }`}>
                                            <div className="text-lg font-bold">{plan.name}</div>
                                            <div className="text-xl font-bold text-blue-300 mt-1">
                                                ₹{plan.price}
                                                {plan.price > 0 && <span className="text-sm text-gray-300">/{plan.duration.split(' ')[0]}</span>}
                                            </div>
                                            {plan.popular && (
                                                <span className="inline-block bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold mt-2">
                                                    Popular Choice
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {/* Profile Access */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        👁️ Profile Access
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm font-semibold border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        } ${
                                            plan.profileAccess.includes('Full') ? 'text-green-400' : 'text-gray-400'
                                        }`}>
                                            {plan.profileAccess}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Messaging */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        💬 Messaging
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        } ${
                                            plan.messaging !== 'Not Available' ? 'text-blue-400' : 'text-red-400'
                                        }`}>
                                            {plan.messaging}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Likes */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        ❤️ Like Profiles
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        } ${
                                            plan.likes !== 'Not Available' ? 'text-purple-400' : 'text-red-400'
                                        }`}>
                                            {plan.likes}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* AI Kundli */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🤖 AI Kundli
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        } ${
                                            plan.aiKundli !== 'Not Available' ? 'text-orange-400' : 'text-red-400'
                                        }`}>
                                            {plan.aiKundli}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Spotlight */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        ⭐ Spotlight
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        } ${
                                            plan.spotlight !== 'Not Included' ? 'text-yellow-400' : 'text-gray-400'
                                        }`}>
                                            {plan.spotlight}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* RM Support */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        👨‍💼 RM Support
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        } ${
                                            plan.rmSupport === 'Included' ? 'text-green-400' : 'text-gray-400'
                                        }`}>
                                            {plan.rmSupport}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Action Buttons */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-6 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🎯 Get Started
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center border-r border-gray-600 ${
                                            plan.popular ? 'bg-yellow-500/10' : ''
                                        }`}>
                                            <button
                                                onClick={() => handleDirectPayment(plan)}
                                                disabled={processingPayment}
                                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                                                    plan.popular
                                                        ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg'
                                                        : plan.price === 0
                                                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
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
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">💳 Secure Payment Guaranteed</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
                        <div className="flex flex-col items-center">
                            <div className="text-2xl mb-2">🔒</div>
                            <div className="font-semibold">PayU Secure</div>
                            <div className="text-sm opacity-90">256-bit SSL Encryption</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl mb-2">💳</div>
                            <div className="font-semibold">All Cards</div>
                            <div className="text-sm opacity-90">Credit & Debit Cards</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl mb-2">🏦</div>
                            <div className="font-semibold">Net Banking</div>
                            <div className="text-sm opacity-90">All Major Banks</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl mb-2">⚡</div>
                            <div className="font-semibold">Instant Access</div>
                            <div className="text-sm opacity-90">Immediate Activation</div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white text-center mb-6">❓ Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                        <div>
                            <h4 className="font-semibold text-white mb-2">Can I upgrade my plan later?</h4>
                            <p className="text-sm">Yes, you can upgrade anytime. You'll only pay the difference for the remaining period.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">Is there a refund policy?</h4>
                            <p className="text-sm">Premium Assisted plan offers money-back guarantee if you get less than 3 curated matches in 45 days.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">How does AI Kundli work?</h4>
                            <p className="text-sm">AI Kundli analyzes birth charts for compatibility matching. Available in Popular and Premium plans.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-2">What is Spotlight feature?</h4>
                            <p className="text-sm">Spotlight puts your profile at the top of search results for 24 hours, increasing visibility.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPricing;