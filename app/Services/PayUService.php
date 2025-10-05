<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PayUService
{
    private $merchantKey;
    private $merchantSalt;
    private $clientId;
    private $clientSecret;
    private $baseUrl;

    public function __construct()
    {
        $this->merchantKey = env('PAYU_MERCHANT_KEY', 'L7ifws');
        $this->merchantSalt = env('PAYU_MERCHANT_SALT', 'gOzLxzydlLgXdltcWqqtYgTG64prQR6F');
        $this->clientId = env('PAYU_CLIENT_ID', 'Oc9lc29ea2942a1b505fc09c87364795cd77a14cb5d7212d14actt51d2b1486');
        $this->clientSecret = env('PAYU_CLIENT_SECRET', '5a2324b63d97ca82c972cd8521513184b3705741331ee0b578e3dbc000367468');
        $this->baseUrl = 'https://test.payu.in'; // Test environment
    }

    public function createPaymentLink($paymentData)
    {
        try {
            // Generate hash for PayU
            $hash = $this->generateHash($paymentData);

            $payload = [
                'key' => $this->merchantKey,
                'txnid' => $paymentData['transaction_id'],
                'amount' => $paymentData['amount'],
                'productinfo' => $paymentData['product_info'],
                'firstname' => $paymentData['first_name'],
                'email' => $paymentData['email'],
                'phone' => $paymentData['phone'] ?? '9999999999',
                'surl' => url('/api/payments/success'),
                'furl' => url('/api/payments/failure'),
                'hash' => $hash,
                'service_provider' => 'payu_paisa'
            ];

            return [
                'payment_url' => "{$this->baseUrl}/_payment",
                'payload' => $payload
            ];

        } catch (\Exception $e) {
            Log::error('PayU Payment Link Creation Failed', [
                'error' => $e->getMessage(),
                'payment_data' => $paymentData
            ]);
            throw $e;
        }
    }

    private function generateHash($paymentData)
    {
        $hashString = "{$this->merchantKey}|{$paymentData['transaction_id']}|{$paymentData['amount']}|{$paymentData['product_info']}|{$paymentData['first_name']}|{$paymentData['email']}|||||||||||{$this->merchantSalt}";
        
        return strtolower(hash('sha512', $hashString));
    }

    public function verifyPayment($transactionId)
    {
        // For now, return a mock verification
        // In production, implement actual PayU verification
        return [
            'status' => 'success',
            'message' => 'Payment verified successfully'
        ];
    }
}