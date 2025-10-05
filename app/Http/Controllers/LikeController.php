<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use App\Models\Profile;
use App\Models\User;

class LikeController extends Controller
{
    /**
     * Like a profile
     * POST /api/likes/{userId}
     */
    public function store($userId)
    {
        $user = Auth::user();
        
        // Prevent users from liking themselves
        if ($user->id == $userId) {
            return response()->json(['message' => 'Cannot like yourself'], 422);
        }
        
        // Find the profile for the user being liked
        $profile = Profile::where('user_id', $userId)->first();
        
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
        
        // Check if already liked using the correct column names
        $existingLike = Like::where('sender_id', $user->id)
            ->where('profile_id', $profile->id)
            ->first();
            
        if ($existingLike) {
            return response()->json(['message' => 'Already liked'], 409);
        }
        
        // Create new like with correct column names
        $like = Like::create([
            'sender_id' => $user->id,
            'profile_id' => $profile->id,
        ]);
        
        return response()->json([
            'message' => 'Profile liked successfully',
            'like' => $like
        ], 201);
    }
    
    /**
     * Unlike a profile
     * DELETE /api/likes/{userId}
     */
    public function destroy($userId)
    {
        $user = Auth::user();
        
        // Find the profile for the user being unliked
        $profile = Profile::where('user_id', $userId)->first();
        
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
        
        $like = Like::where('sender_id', $user->id)
            ->where('profile_id', $profile->id)
            ->first();
            
        if (!$like) {
            return response()->json(['message' => 'Like not found'], 404);
        }
        
        $like->delete();
        
        return response()->json(['message' => 'Unliked successfully']);
    }
    
    /**
     * Get user's liked profiles
     * GET /api/likes
     */
    public function index()
    {
        $user = Auth::user();
        
        $likes = Like::with('profile.user')
            ->where('sender_id', $user->id)
            ->get()
            ->map(function ($like) {
                return [
                    'profile' => $like->profile,
                    'user' => $like->profile->user,
                    'created_at' => $like->created_at
                ];
            });
            
        return response()->json($likes);
    }
    
    /**
     * Get user's likes (myLikes endpoint)
     * GET /api/me/likes
     */
    public function myLikes()
    {
        $user = Auth::user();
        
        $likes = Like::with('profile.user')
            ->where('sender_id', $user->id)
            ->get()
            ->map(function ($like) {
                return [
                    'id' => $like->profile->user->id,
                    'user_id' => $like->profile->user->id,
                    'user' => $like->profile->user,
                    'profile' => $like->profile,
                    'created_at' => $like->created_at
                ];
            });
            
        return response()->json($likes);
    }
    
    /**
     * Get like count for a profile
     * GET /api/profiles/{id}/likes/count
     */
    public function count($id)
    {
        // $id could be user ID or profile ID, let's handle both
        $profile = Profile::where('user_id', $id)->orWhere('id', $id)->first();
        
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
        
        $count = Like::where('profile_id', $profile->id)->count();
        
        return response()->json(['count' => $count]);
    }
    
    /**
     * Toggle like status
     * POST /api/profiles/{id}/like
     */
    public function toggle($id)
    {
        $user = Auth::user();
        
        // Find the profile (id could be user ID or profile ID)
        $profile = Profile::where('user_id', $id)->orWhere('id', $id)->first();
        
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
        
        // Prevent users from liking themselves
        if ($user->id == $profile->user_id) {
            return response()->json(['message' => 'Cannot like yourself'], 422);
        }
        
        $existingLike = Like::where('sender_id', $user->id)
            ->where('profile_id', $profile->id)
            ->first();
            
        if ($existingLike) {
            $existingLike->delete();
            return response()->json(['message' => 'Like removed', 'liked' => false]);
        } else {
            $like = Like::create([
                'sender_id' => $user->id,
                'profile_id' => $profile->id,
            ]);
            return response()->json(['message' => 'Profile liked', 'liked' => true, 'like' => $like]);
        }
    }
}