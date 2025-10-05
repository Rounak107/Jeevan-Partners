<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\LikeController; 
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RazorpayPaymentController; // ADD THIS LINE

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

// Add this temporary test route
Route::get('/test-auth', function (Request $request) {
    $user = $request->user();
    
    if (!$user) {
        return response()->json([
            'message' => 'Not authenticated',
            'auth_header' => $request->header('Authorization'),
            'user' => null
        ], 401);
    }
    
    return response()->json([
        'message' => 'Authenticated successfully',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ]
    ]);
})->middleware('auth:sanctum');

// Test routes to verify everything works
Route::get('/test-payment-route', function () {
    return response()->json([
        'message' => 'Payment route test - SUCCESS',
        'timestamp' => now()
    ]);
});

Route::post('/test-payment-post', function (Request $request) {
    return response()->json([
        'message' => 'Payment POST route test - SUCCESS',
        'data_received' => $request->all(),
        'timestamp' => now()
    ]);
});

// Mock payment for development (temporary)
Route::post('/payments/mock-initiate', function (Request $request) {
    $user = $request->user();
    
    if (!$user) {
        return response()->json(['success' => false, 'message' => 'Not authenticated'], 401);
    }

    $request->validate([
        'plan_id' => 'required|string',
        'plan_name' => 'required|string',
        'amount' => 'required|numeric|min:1',
        'currency' => 'required|string'
    ]);
    
    $orderId = 'mock_order_' . time() . rand(1000, 9999);

    return response()->json([
        'success' => true,
        'order_id' => $orderId,
        'amount' => $request->amount * 100,
        'currency' => $request->currency,
        'key' => 'mock_key',
        'name' => env('APP_NAME', 'Matrimonial App'),
        'description' => $request->plan_name . ' Membership',
        'prefill' => [
            'name' => $user->name,
            'email' => $user->email,
            'contact' => $user->phone ?? '9999999999'
        ],
        'theme' => ['color' => '#3B82F6'],
        'message' => 'Mock payment initiated successfully'
    ]);
})->middleware('auth:sanctum');

// Auth (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ========== RAZORPAY TEST CONFIGURATION ROUTE ==========
Route::get('/test-razorpay-config', [RazorpayPaymentController::class, 'testConfig']);

// ========== RAZORPAY PAYMENT ROUTES (MUST BE PUBLIC) ==========
Route::post('/payments/success', [RazorpayPaymentController::class, 'paymentSuccess']);
Route::post('/payments/failure', [RazorpayPaymentController::class, 'paymentFailure']);

// Broadcasting authentication route - FIXED VERSION
Route::post('/broadcasting/auth', function (Request $request) {
    \Log::info('Broadcasting auth request received', [
        'channel_name' => $request->channel_name,
        'socket_id' => $request->socket_id,
        'user' => $request->user() ? $request->user()->id : 'none'
    ]);

    $user = $request->user();
    
    if (!$user) {
        \Log::warning('Broadcasting auth failed: No authenticated user');
        return response()->json(['message' => 'Unauthorized - no user'], 403);
    }
    
    $channelName = $request->channel_name;
    
    // For private channels, authorize based on channel name
    if (str_starts_with($channelName, 'private-conversation.')) {
        $conversationId = str_replace('private-conversation.', '', $channelName);
        
        \Log::info('Checking conversation access', [
            'user_id' => $user->id,
            'conversation_id' => $conversationId,
            'channel_name' => $channelName
        ]);
        
        // Check if user is a participant in the conversation
        $isParticipant = \App\Models\Conversation::where('id', $conversationId)
            ->whereHas('participants', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->exists();
            
        if ($isParticipant) {
            \Log::info('Broadcasting auth approved', [
                'user_id' => $user->id,
                'conversation_id' => $conversationId
            ]);
            
            // Return proper Pusher auth response
            return response()->json([
                'auth' => \Illuminate\Support\Str::random(40) // Simple auth token
            ]);
        } else {
            \Log::warning('Broadcasting auth denied: User not participant', [
                'user_id' => $user->id,
                'conversation_id' => $conversationId
            ]);
        }
    }
    
    \Log::warning('Broadcasting auth denied: Channel not recognized', [
        'channel_name' => $channelName
    ]);
    
    return response()->json(['message' => 'Unauthorized'], 403);
})->middleware('auth:sanctum');

// ========== PROTECTED ROUTES (REQUIRE AUTHENTICATION) ==========
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']); // current user

    // Profiles: public listing & detail, plus own profile endpoints
    Route::get('/profiles', [ProfileController::class, 'index']);     // list + filters
    Route::get('/profiles/{id}', [ProfileController::class, 'show']); // public detail (by id)

    // Own profile (authenticated)
    Route::get('/profile', [ProfileController::class, 'own']);        // get own profile
    Route::post('/profiles', [ProfileController::class, 'store']);   // create or upsert own profile
    Route::put('/profile', [ProfileController::class, 'updateOwn']); // update own profile
    Route::delete('/profiles/{id}', [ProfileController::class, 'destroy']);

    Route::get('/recommendations', [RecommendationController::class, 'index']);
    Route::post('/profiles/{id}/like', [LikeController::class,'toggle']);
    Route::get('/me/likes', [LikeController::class,'myLikes']);
    Route::get('/profiles/{id}/likes/count', [LikeController::class,'count']);

    Route::get('/conversations', [MessageController::class, 'index']);
    Route::post('/conversations/{targetUserId}', [MessageController::class, 'startConversation']);
    Route::get('/conversations/{id}', [MessageController::class, 'show']);
    Route::post('/conversations/{id}/messages', [MessageController::class, 'sendMessage']);

    // Like routes
    Route::post('/likes/{user}', [LikeController::class, 'store']);
    Route::delete('/likes/{user}', [LikeController::class, 'destroy']);
    Route::get('/likes', [LikeController::class, 'index']);
    Route::get('/me/likes', [LikeController::class, 'myLikes']);
    Route::get('/profiles/{id}/likes/count', [LikeController::class, 'count']);
    Route::post('/profiles/{id}/like', [LikeController::class, 'toggle']);

    // Membership routes
    Route::get('/membership/plans', [MembershipController::class, 'getPlans']);

    // Razorpay Payment initiation (requires auth)
    Route::post('/payments/initiate', [RazorpayPaymentController::class, 'initiatePayment']);
});