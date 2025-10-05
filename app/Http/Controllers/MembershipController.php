<?php
// app/Http/Controllers/MembershipController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function getPlans()
    {
        $plans = [
            [
                'id' => 'free',
                'name' => 'Free (Freemium)',
                'price' => 0,
                'currency' => '₹',
                'duration' => '',
                'features' => [
                    'Create profile (photo + basic details)',
                    'Daily browse cap: 25 new profiles/day',
                    'Shortlist up to 25 profiles',
                    'Send pre-defined interest messages (templated) — 5/day',
                    'See blurred/masked mobile numbers (request unlock)',
                    'Option to purchase verification or unlocks a la carte'
                ],
                'popular' => false
            ],
            [
                'id' => 'starter',
                'name' => 'Starter',
                'price' => 149,
                'currency' => '₹',
                'duration' => '1 month',
                'features' => [
                    'View up to 15 unlocked mobile numbers',
                    'Send up to 50 personalized messages',
                    '1 x 24-hour Spotlight',
                    'Profile verification (phone) optional at ₹29',
                    'Includes 150 credits',
                    'Refund window: 3 days (if no unlocks used)'
                ],
                'popular' => false
            ],
            [
                'id' => 'essential',
                'name' => 'Essential',
                'price' => 399,
                'currency' => '₹',
                'duration' => '3 months',
                'features' => [
                    'View up to 50 unlocked mobile numbers',
                    'Unlimited messages (fair use: 100/day)',
                    '1 Spotlight per month (24 hours each)',
                    'Profile highlighted for 14 days',
                    'Phone verification included',
                    'Includes 500 credits',
                    'Priority chat support (email within 48 hours)'
                ],
                'popular' => true
            ],
            [
                'id' => 'popular',
                'name' => 'Popular',
                'price' => 1499,
                'currency' => '₹',
                'duration' => '12 months',
                'features' => [
                    'Unlimited mobile number views (200/month cap)',
                    'Unlimited messages (fair use: 150/day)',
                    '1 Spotlight every month',
                    'Profile in Top 50 search results for first 30 days',
                    'All verification features included'
                ],
                'popular' => false
            ],
            [
                'id' => 'premium',
                'name' => 'Premium Assisted',
                'price' => 3499,
                'currency' => '₹',
                'duration' => '12 months',
                'features' => [
                    'All Popular features',
                    '1 month of assisted introductions by Relationship Manager',
                    'Up to 8 curated matches',
                    'Offline verification for top 3 matches',
                    'Priority RM chat + phone support',
                    'Money-back guarantee'
                ],
                'popular' => false
            ]
        ];

        return response()->json($plans);
    }
}