<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Razorpay\Api\Api;
use Exception;

class RazorpayPaymentController extends Controller
{
    private $razorpay;

    public function __construct()
    {
        // Set longer timeout for API calls
        $key = env('RAZORPAY_KEY');
        $secret = env('RAZORPAY_SECRET');
        
        if (!$key || !$secret) {
            throw new Exception('Razorpay credentials not configured');
        }
        
        // Initialize Razorpay with timeout settings
        $this->razorpay = new Api($key, $secret);
    }

    /**
     * Initiate Razorpay payment with better error handling
     */
    public function initiatePayment(Request $request)
{
    // Increase execution time for this request
    set_time_limit(60); // 60 seconds
    
    $request->validate([
        'plan_id' => 'required|string',
        'plan_name' => 'required|string',
        'amount' => 'required|numeric|min:1',
        'currency' => 'required|string|in:INR,USD' // Only allow supported currencies
    ]);

    $user = Auth::user();
    
    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'User not authenticated'
        ], 401);
    }

    // Generate unique receipt ID
    $receiptId = 'RCPT' . time() . rand(1000, 9999);

    try {
        Log::info('Creating Razorpay order', [
            'user_id' => $user->id,
            'amount' => $request->amount,
            'currency' => $request->currency
        ]);

        // Create Razorpay order with timeout handling
        $orderData = [
            'receipt' => $receiptId,
            'amount' => $request->amount * 100, // Razorpay expects amount in paise
            'currency' => $request->currency,
            'notes' => [
                'plan_id' => $request->plan_id,
                'plan_name' => $request->plan_name,
                'user_id' => $user->id,
                'user_email' => $user->email
            ]
        ];

        $razorpayOrder = $this->razorpay->order->create($orderData);

        Log::info('Razorpay Order Created Successfully', [
            'user_id' => $user->id,
            'order_id' => $razorpayOrder->id,
            'amount' => $request->amount,
            'plan' => $request->plan_name
        ]);

        return response()->json([
            'success' => true,
            'order_id' => $razorpayOrder->id,
            'amount' => $request->amount * 100, // Return amount in paise for frontend
            'currency' => $request->currency,
            'key' => env('RAZORPAY_KEY'),
            'name' => env('APP_NAME', 'Jeevan Partners'), // Updated to use APP_NAME
            'description' => $request->plan_name . ' Membership',
            'prefill' => [
                'name' => $user->name,
                'email' => $user->email,
                'contact' => $user->phone ?? '9999999999'
            ],
            'notes' => [
                'plan_id' => $request->plan_id,
                'user_id' => $user->id
            ],
            'theme' => [
                'color' => '#3B82F6'
            ],
            // Enable more payment methods
            'method' => [
                'netbanking' => true,
                'card' => true,
                'upi' => true,
                'wallet' => true
            ],
            'bank' => [
                'HDFC' => true,
                'ICICI' => true,
                'SBI' => true,
                'AXIS' => true
            ],
            'message' => 'Payment initiated successfully'
        ]);

    } catch (Exception $e) {
        Log::error('Razorpay Payment initiation failed', [
            'error' => $e->getMessage(),
            'error_type' => get_class($e),
            'user_id' => $user->id,
            'amount' => $request->amount,
            'currency' => $request->currency
        ]);

        // Provide more specific error messages
        $errorMessage = 'Payment initiation failed. ';
        
        if (str_contains($e->getMessage(), 'cURL error 28') || str_contains($e->getMessage(), 'timeout')) {
            $errorMessage .= 'Payment gateway is temporarily unavailable. Please try again.';
        } elseif (str_contains($e->getMessage(), 'currency')) {
            $errorMessage .= 'Currency not supported. Please contact support.';
        } else {
            $errorMessage .= 'Please try again or contact support.';
        }

        return response()->json([
            'success' => false,
            'message' => $errorMessage,
            'debug_error' => env('APP_DEBUG') ? $e->getMessage() : null
        ], 500);
    }
}

    /**
     * Handle Razorpay payment success
     */
    public function paymentSuccess(Request $request)
    {
        $request->validate([
            'razorpay_payment_id' => 'required|string',
            'razorpay_order_id' => 'required|string',
            'razorpay_signature' => 'required|string'
        ]);

        try {
            $attributes = [
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature
            ];

            // Verify payment signature
            $this->razorpay->utility->verifyPaymentSignature($attributes);

            // Payment successful - update user membership
            $order = $this->razorpay->order->fetch($request->razorpay_order_id);
            $payment = $this->razorpay->payment->fetch($request->razorpay_payment_id);

            Log::info('Razorpay Payment Successful', [
                'order_id' => $request->razorpay_order_id,
                'payment_id' => $request->razorpay_payment_id,
                'amount' => $payment->amount / 100,
                'user_notes' => $order->notes
            ]);

            // TODO: Update user membership based on plan_id in notes
            // You can add your membership activation logic here

            return response()->json([
                'success' => true,
                'message' => 'Payment successful! Your membership has been activated.',
                'payment_id' => $request->razorpay_payment_id,
                'order_id' => $request->razorpay_order_id,
                'amount' => $payment->amount / 100
            ]);

        } catch (Exception $e) {
            Log::error('Razorpay Payment verification failed', [
                'error' => $e->getMessage(),
                'order_id' => $request->razorpay_order_id
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment verification failed: ' . $e->getMessage()
            ], 400);
        }
    }

    /**
     * Handle Razorpay payment failure
     */
    public function paymentFailure(Request $request)
    {
        Log::info('Razorpay Payment Failed', $request->all());

        return response()->json([
            'success' => false,
            'message' => 'Payment failed. Please try again.',
            'error' => $request->error_description ?? 'Payment was not completed'
        ]);
    }

    /**
     * Test Razorpay configuration with better error handling
     */
    public function testConfig()
    {
        try {
            set_time_limit(30); // 30 seconds for test
            
            $testOrder = $this->razorpay->order->create([
                'receipt' => 'TEST' . time(),
                'amount' => 1000, // 10 INR
                'currency' => 'INR'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Razorpay configuration is working correctly',
                'test_order_id' => $testOrder->id,
                'key' => env('RAZORPAY_KEY'),
                'environment' => 'test'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Razorpay configuration error: ' . $e->getMessage(),
                'error_type' => get_class($e),
                'suggestion' => 'Check your internet connection and Razorpay credentials'
            ], 500);
        }
    }
    
    /**
     * Simple test without API call to verify basic setup
     */
    public function testBasicConfig()
    {
        try {
            $key = env('RAZORPAY_KEY');
            $secret = env('RAZORPAY_SECRET');
            
            if (!$key || !$secret) {
                throw new Exception('Razorpay credentials not found in environment');
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Basic Razorpay configuration is correct',
                'key_exists' => !empty($key),
                'secret_exists' => !empty($secret),
                'key_prefix' => substr($key, 0, 8) . '...',
                'environment' => 'test'
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Configuration error: ' . $e->getMessage()
            ], 500);
        }
    }
}