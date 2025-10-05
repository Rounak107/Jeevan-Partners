// matrimonial-frontend/src/components/MembershipPricing.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api'; 

const MembershipPricing = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    // Static plans data with all features for comparison chart
    const staticPlans = [
        {
            id: 'free',
            name: 'Free (Freemium)',
            price: 0,
            currency: 'INR',
            duration: '',
            features: [
                'Create profile (photo + basic details)',
                'Daily browse cap: 25 new profiles/day',
                'Shortlist up to 25 profiles',
                'Send pre-defined interest messages (templated) — 5/day',
                'See blurred/masked mobile numbers (request unlock)',
                'Option to purchase verification or unlocks a la carte'
            ],
            popular: false,
            credits: 'N/A',
            verification: 'Optional (Paid)',
            support: 'Basic',
            spotlight: 'Not included',
            messages: '5 templated/day',
            profileViews: '25/day',
            mobileViews: 'Masked (Request unlock)',
            profileHighlight: 'No',
            searchPriority: 'Basic',
            creditsIncluded: '0',
            refundPolicy: 'N/A'
        },
        {
            id: 'starter',
            name: 'Starter',
            price: 149,
            currency: 'INR',
            duration: '1 month',
            features: [
                'View up to 15 unlocked mobile numbers',
                'Send up to 50 personalized messages',
                '1 x 24-hour Spotlight',
                'Profile verification (phone) optional at ₹29',
                'Includes 150 credits (unlocking one phone = 10 credits)',
                'Refund window: 3 days (if no unlocks used)'
            ],
            popular: false,
            credits: '150 credits',
            verification: 'Optional (₹29)',
            support: 'Basic',
            spotlight: '1 (24 hours)',
            messages: '50 personalized',
            profileViews: 'Unlimited',
            mobileViews: '15 unlocked',
            profileHighlight: 'No',
            searchPriority: 'Standard',
            creditsIncluded: '150',
            refundPolicy: '3 days'
        },
        {
            id: 'essential',
            name: 'Essential',
            price: 399,
            currency: 'INR',
            duration: '3 months',
            features: [
                'View up to 50 unlocked mobile numbers',
                'Unlimited messages (fair use: 100/day)',
                '1 Spotlight per month (24 hours each)',
                'Profile highlighted for 14 days (accent color + badge)',
                'Phone verification included',
                'ID verification optional at ₹99',
                'Includes 500 credits (phone unlock 8-10 credits)',
                'Priority chat support (email within 48 hours)'
            ],
            popular: true,
            credits: '500 credits',
            verification: 'Phone included',
            support: 'Priority (48h)',
            spotlight: '1 per month',
            messages: 'Unlimited (100/day)',
            profileViews: 'Unlimited',
            mobileViews: '50 unlocked',
            profileHighlight: '14 days',
            searchPriority: 'Enhanced',
            creditsIncluded: '500',
            refundPolicy: '7 days'
        },
        {
            id: 'popular',
            name: 'Popular',
            price: 1499,
            currency: 'INR',
            duration: '12 months',
            features: [
                'Unlimited mobile number views (200/month credit allocation)',
                'Unlimited messages (fair use: 150/day)',
                '1 Spotlight every month',
                'Profile in Top 50 search results for first 30 days',
                'All verification features included',
                'Premium search positioning'
            ],
            popular: false,
            credits: '200/month',
            verification: 'All included',
            support: 'Premium',
            spotlight: '1 per month',
            messages: 'Unlimited (150/day)',
            profileViews: 'Unlimited',
            mobileViews: 'Unlimited',
            profileHighlight: '30 days',
            searchPriority: 'Top 50 (30 days)',
            creditsIncluded: '200/month',
            refundPolicy: '15 days'
        },
        {
            id: 'premium',
            name: 'Premium Assisted',
            price: 3499,
            currency: 'INR',
            duration: '12 months',
            features: [
                'All Popular features',
                '1 month of assisted introductions by Relationship Manager',
                'Up to 8 curated matches',
                'Offline verification for top 3 matches (in-city only)',
                'Priority RM chat + phone support',
                'Money-back guarantee: partial refund if curated introductions < 3 in first 45 days'
            ],
            popular: false,
            credits: 'Unlimited',
            verification: 'Full + Offline',
            support: 'RM Priority',
            spotlight: '1 per month +',
            messages: 'Unlimited (150/day)',
            profileViews: 'Unlimited',
            mobileViews: 'Unlimited',
            profileHighlight: 'Permanent',
            searchPriority: 'Top 10',
            creditsIncluded: 'Unlimited',
            refundPolicy: '45 days',
            curatedMatches: '8 matches',
            rmSupport: 'Included'
        }
    ];

    useEffect(() => {
        setPlans(staticPlans);
        setLoading(false);
    }, []);

    const initiatePayment = async (plan) => {
    if (plan.price === 0) {
        alert('Free plan selected! You can start using the free features immediately.');
        return;
    }

    setProcessingPayment(true);
    
    try {
        const response = await API.post('/payments/initiate', {
            plan_id: plan.id,
            plan_name: plan.name,
            amount: plan.price,
            currency: plan.currency
        });

        console.log('Razorpay response:', response.data);

        if (response.data.success) {
            // Load Razorpay script dynamically
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                const options = {
                    key: response.data.key,
                    amount: response.data.amount,
                    currency: response.data.currency,
                    name: response.data.name,
                    description: response.data.description,
                    order_id: response.data.order_id,
                    handler: async function (paymentResponse) {
                        console.log('Payment successful:', paymentResponse);
                        
                        try {
                            // Verify payment with backend
                            const verifyResponse = await API.post('/payments/success', {
                                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                razorpay_order_id: paymentResponse.razorpay_order_id,
                                razorpay_signature: paymentResponse.razorpay_signature
                            });

                            if (verifyResponse.data.success) {
                                alert('Payment successful! Your membership has been activated.');
                                // You can redirect or update UI here
                            } else {
                                alert('Payment verification failed: ' + verifyResponse.data.message);
                            }
                        } catch (error) {
                            console.error('Payment verification error:', error);
                            alert('Payment verification failed. Please contact support.');
                        }
                    },
                    prefill: response.data.prefill,
                    notes: response.data.notes,
                    theme: response.data.theme,
                    // Enable all payment methods
                    method: {
                        netbanking: true,
                        card: true,
                        upi: true,
                        wallet: true
                    },
                    bank: {
                        'HDFC': true,
                        'ICICI': true,
                        'SBI': true,
                        'AXIS': true
                    },
                    modal: {
                        ondismiss: function() {
                            console.log('Payment modal dismissed');
                            setProcessingPayment(false);
                        }
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            };
            
            document.body.appendChild(script);

        } else {
            throw new Error('Failed to initiate payment');
        }
        
    } catch (error) {
        console.error('Payment initiation failed:', error);
        console.error('Error details:', error.response?.data);
        alert('Payment initiation failed. Please try again.');
        setProcessingPayment(false);
    }
};

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        
        if (plan.price === 0) {
            // Free plan - no payment needed
            initiatePayment(plan);
        } else {
            // Paid plan - show confirmation before payment
            const userConfirmed = window.confirm(
                `You have selected: ${plan.name}\n\n` +
                `Amount: ₹${plan.price}\n` +
                `Duration: ${plan.duration}\n\n` +
                `Do you want to proceed to payment?`
            );
            
            if (userConfirmed) {
                initiatePayment(plan);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Membership Packages
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Choose the perfect plan to find your perfect match. 
                        Start with free features or upgrade for premium benefits.
                    </p>
                </div>

                {/* Payment Processing Overlay */}
                {processingPayment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <div>
                                    <p className="text-gray-800 font-semibold">Processing Payment</p>
                                    <p className="text-gray-600 text-sm">Redirecting to secure payment gateway...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected Plan Info (if any) */}
                {selectedPlan && selectedPlan.price > 0 && (
                    <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <p className="text-green-200 text-lg font-semibold">Selected Plan: <span className="text-white">{selectedPlan.name}</span></p>
                                <p className="text-green-200">Amount to Pay: <span className="font-bold text-white text-xl">₹{selectedPlan.price}</span></p>
                                <p className="text-green-200 text-sm">Duration: {selectedPlan.duration}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setSelectedPlan(null)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Change Plan
                                </button>
                                <button
                                    onClick={() => initiatePayment(selectedPlan)}
                                    disabled={processingPayment}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center"
                                >
                                    {processingPayment ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay ₹${selectedPlan.price}`
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${
                                plan.popular 
                                    ? 'ring-2 ring-blue-500 transform scale-105 border-blue-500' 
                                    : 'border border-gray-700'
                            } bg-gray-800 flex flex-col h-full`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        🏆 Most Popular
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
                                        <span className="text-3xl font-bold text-white">
                                            ₹{plan.price}
                                        </span>
                                        {plan.duration && (
                                            <span className="text-gray-400 ml-2">
                                                /{plan.duration}
                                            </span>
                                        )}
                                    </div>
                                    {plan.price === 0 ? (
                                        <p className="text-green-400 font-semibold">Free Forever</p>
                                    ) : (
                                        <p className="text-gray-400 text-sm">
                                            {plan.duration === '1 month' ? 'Billed monthly' : 
                                             plan.duration === '3 months' ? 'Billed quarterly' : 
                                             'Billed annually'}
                                        </p>
                                    )}
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
                                    onClick={() => handleSelectPlan(plan)}
                                    disabled={processingPayment}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors mt-auto ${
                                        plan.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                                            : plan.price === 0
                                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {processingPayment ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </div>
                                    ) : plan.price === 0 ? (
                                        'Get Started Free'
                                    ) : (
                                        `Buy Now - ₹${plan.price}`
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Plan Comparison Chart */}
                <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="px-6 py-6 bg-gradient-to-r from-blue-600 to-purple-700">
                        <h2 className="text-3xl font-bold text-white text-center">
                            Detailed Plan Comparison
                        </h2>
                        <p className="text-blue-100 text-center mt-2">
                            Compare all features across different membership plans
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
                                            plan.popular ? 'bg-blue-900/30' : ''
                                        }`}>
                                            <div className="text-lg font-bold">{plan.name}</div>
                                            <div className="text-xl font-bold text-blue-300 mt-1">
                                                ₹{plan.price}
                                                {plan.duration && <span className="text-sm text-gray-300">/{plan.duration.split(' ')[0]}</span>}
                                            </div>
                                            {plan.popular && (
                                                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">
                                                    Popular Choice
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {/* Price */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        💰 Price
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm font-semibold text-white border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            ₹{plan.price}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Duration */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        ⏱️ Duration
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.duration || 'Lifetime'}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Profile Views */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        👥 Daily Profile Views
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.profileViews}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Messages */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        💬 Messages
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.messages}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Mobile Number Views */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        📱 Mobile Number Views
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.mobileViews}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Spotlight */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        ✨ Spotlight Feature
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.spotlight}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Verification */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        ✅ Profile Verification
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.verification}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Credits */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🪙 Credits Included
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.creditsIncluded}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Profile Highlight */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🌟 Profile Highlight
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.profileHighlight}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Search Priority */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🔍 Search Priority
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.searchPriority}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Support */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🛟 Customer Support
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.support}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Refund Policy */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        💰 Refund Policy
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.refundPolicy}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Premium Features */}
                                <tr className="hover:bg-gray-750 bg-gray-750/50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🚀 Premium Features
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center text-sm text-gray-300 border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            {plan.curatedMatches && `Curated Matches: ${plan.curatedMatches}`}
                                            {plan.rmSupport && 'RM Support'}
                                            {!plan.curatedMatches && !plan.rmSupport && 'Basic Features'}
                                        </td>
                                    ))}
                                </tr>
                                
                                {/* Action */}
                                <tr className="hover:bg-gray-750">
                                    <td className="px-6 py-6 text-sm font-medium text-gray-300 border-r border-gray-600">
                                        🎯 Get Started
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`px-4 py-4 text-center border-r border-gray-600 ${
                                            plan.popular ? 'bg-blue-900/10' : ''
                                        }`}>
                                            <button
                                                onClick={() => handleSelectPlan(plan)}
                                                disabled={processingPayment}
                                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                                                    plan.popular
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                                                        : plan.price === 0
                                                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
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

                {/* Payment Information */}
                <div className="bg-blue-900 border border-blue-700 rounded-lg p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-600 p-2 rounded-lg mr-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white">Secure Payment Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-blue-200">
                        <div className="flex items-center">
                            <span className="mr-2">🔒</span>
                            SSL Encrypted Payment
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">💳</span>
                            Multiple Payment Options
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">🛡️</span>
                            Razorpay Secure Gateway
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">📧</span>
                            Instant Email Receipt
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPricing;