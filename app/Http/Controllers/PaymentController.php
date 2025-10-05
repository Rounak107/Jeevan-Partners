<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Initiate payment for membership plan
     */
    public function initiatePayment(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|string',
            'plan_name' => 'required|string',
            'amount' => 'required|numeric|min:1',
            'currency' => 'required|string'
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Generate unique transaction ID
        $transactionId = 'TXN' . time() . rand(1000, 9999);

        try {
            $paymentLink = $this->createPayUPaymentLink([
                'transaction_id' => $transactionId,
                'amount' => $request->amount,
                'product_info' => $request->plan_name . ' Membership',
                'first_name' => $user->name,
                'email' => $user->email,
                'phone' => isset($user->phone) ? $user->phone : '9999999999',
                'plan_id' => $request->plan_id
            ]);

            Log::info('PayU Payment initiated successfully', [
                'user_id' => $user->id,
                'transaction_id' => $transactionId,
                'amount' => $request->amount
            ]);

            return response()->json([
                'success' => true,
                'payment_url' => $paymentLink['payment_url'],
                'payload' => $paymentLink['payload'],
                'transaction_id' => $transactionId,
                'message' => 'Payment initiated successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('PayU Payment initiation failed', [
                'error' => $e->getMessage(),
                'user_id' => $user->id
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment initiation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a PayU payment link payload
     */
    private function createPayUPaymentLink(array $paymentData)
    {
        $merchantKey = env('PAYU_MERCHANT_KEY');
        $merchantSalt = env('PAYU_MERCHANT_SALT');
        $mode = env('PAYU_MODE', 'test');

        $baseUrl = $mode === 'live' ? 'https://secure.payu.in' : 'https://test.payu.in';
        $amount = number_format((float)$paymentData['amount'], 2, '.', '');
        $txnid = $paymentData['transaction_id'];

        // UDF fields (safe isset checks)
        $udf1 = isset($paymentData['phone']) ? $paymentData['phone'] : '';
        $udf2 = isset($paymentData['plan_id']) ? $paymentData['plan_id'] : '';
        $udf3 = isset($paymentData['udf3']) ? $paymentData['udf3'] : '';
        $udf4 = isset($paymentData['udf4']) ? $paymentData['udf4'] : '';
        $udf5 = isset($paymentData['udf5']) ? $paymentData['udf5'] : '';

        $productInfo = isset($paymentData['product_info']) ? $paymentData['product_info'] : '';
        $firstName = isset($paymentData['first_name']) ? $paymentData['first_name'] : '';
        $email = isset($paymentData['email']) ? $paymentData['email'] : '';

        // Build the hash string exactly as PayU expects:
        // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
        $part1 = implode('|', [
            $merchantKey,
            $txnid,
            $amount,
            $productInfo,
            $firstName,
            $email,
            $udf1,
            $udf2,
            $udf3,
            $udf4,
            $udf5
        ]);

        // Append the 6 empty pipes and the salt (PayU expects these empty '|'s)
        $hashString = $part1 . '||||||' . $merchantSalt;

        Log::info('PayU Hash String Computed', ['hash_string' => $hashString, 'pipes' => substr_count($hashString, '|')]);

        // Lowercase sha512 hex
        $hash = strtolower(hash('sha512', $hashString));
        Log::info('PayU Hash Generated', ['hash' => $hash]);

        // Build payload for PayU
        $payload = [
            'key' => $merchantKey,
            'txnid' => $txnid,
            'amount' => $amount,
            'productinfo' => $productInfo,
            'firstname' => $firstName,
            'email' => $email,
            'phone' => isset($paymentData['phone']) ? $paymentData['phone'] : '',
            'surl' => url('/api/payments/success'),
            'furl' => url('/api/payments/failure'),
            'hash' => $hash,
            'service_provider' => 'payu_paisa',
            'udf1' => $udf1,
            'udf2' => $udf2,
            'udf3' => $udf3,
            'udf4' => $udf4,
            'udf5' => $udf5,
        ];

        return [
            'payment_url' => rtrim($baseUrl, '/') . '/_payment',
            'payload' => $payload,
        ];
    }

    /**
     * Handle PayU success callback
     */
    public function paymentSuccess(Request $request)
    {
        $allParams = $request->all();
        Log::info('PayU Success Callback', ['data' => $allParams]);

        if (empty($allParams)) {
            return response('<h2>Payment is being processed...</h2>');
        }

        $transactionId = $request->input('txnid', $request->query('txnid'));
        $amount = $request->input('amount', $request->query('amount'));
        $status = $request->input('status', $request->query('status'));

        return response("
            <html>
                <head><title>Payment Success</title></head>
                <body style='text-align:center;padding:50px;font-family:Arial;'>
                    <h1 style='color:green;'>✅ Payment Successful!</h1>
                    <p><strong>Transaction ID:</strong> {$transactionId}</p>
                    <p><strong>Amount:</strong> ₹{$amount}</p>
                    <p><strong>Status:</strong> {$status}</p>
                    <p>Your membership has been activated successfully.</p>
                    <button onclick='window.close()'>Close Window</button>
                </body>
            </html>
        ");
    }

    /**
     * Handle PayU failure callback
     */
    public function paymentFailure(Request $request)
    {
        $allParams = $request->all();
        Log::info('PayU Failure Callback', ['data' => $allParams]);

        $transactionId = $request->input('txnid', $request->query('txnid'));
        $errorMessage = $request->input('error_Message', $request->query('error_Message', 'Payment failed'));

        return response("
            <html>
                <head><title>Payment Failed</title></head>
                <body style='text-align:center;padding:50px;font-family:Arial;'>
                    <h1 style='color:red;'>❌ Payment Failed</h1>
                    <p><strong>Transaction ID:</strong> {$transactionId}</p>
                    <p><strong>Error:</strong> {$errorMessage}</p>
                    <p>Please try again or contact support.</p>
                    <button onclick='window.close()'>Close Window</button>
                </body>
            </html>
        ");
    }
}
