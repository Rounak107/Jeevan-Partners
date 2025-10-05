<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Public list of profiles (with basic filters & pagination).
     * GET /api/profiles
     * Query params: gender, city, min_age, max_age, page
     */
    public function index(Request $request)
    {
        $query = Profile::with('user');

        if ($gender = $request->query('gender')) {
            $query->where('gender', $gender);
        }

        if ($city = $request->query('city')) {
            $query->where('city', 'LIKE', "%{$city}%");
        }

        if ($min = $request->query('min_age')) {
            $query->where('age', '>=', (int)$min);
        }

        if ($max = $request->query('max_age')) {
            $query->where('age', '<=', (int)$max);
        }

        // New filters
        if ($religion = $request->query('religion')) {
            $query->where('religion', 'LIKE', "%{$religion}%");
        }

        if ($caste = $request->query('caste')) {
            $query->where('caste', 'LIKE', "%{$caste}%");
        }

        if ($manglik = $request->query('manglik')) {
            $query->where('manglik', $manglik);
        }

        return $query->paginate(10);
    }

    /**
     * Public single profile by id.
     * GET /api/profiles/{id}
     */
    public function show($id)
    {
        return Profile::with('user')->findOrFail($id);
    }

    /**
     * Get own profile (authenticated).
     * GET /api/profile
     */
    public function own(Request $request)
    {
        $user = $request->user();
        
        // Load the profile with user relationship
        $profile = Profile::with('user')->where('user_id', $user->id)->first();
        
        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found',
                'user' => $user // Return basic user info even if no profile
            ], 404);
        }
        
        return response()->json($profile);
    }

    /**
     * Create or update authenticated user's profile.
     * POST /api/profiles
     * Use multipart/form-data for file uploads (profile_photo, photos[])
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        Log::info('Profile store request received', [
            'has_profile_photo' => $request->hasFile('profile_photo'),
            'has_photos' => $request->hasFile('photos'),
            'user_id' => $user->id
        ]);

        // Updated validation rules with new fields
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'age' => 'sometimes|integer|min:18',
            'gender' => 'required|in:male,female,other',
            'dob' => 'nullable|date',
            'city' => 'required|string',
            'education' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'caste' => 'nullable|string|max:255',
            'height' => 'nullable|integer|min:100|max:250', // in cm
            'weight' => 'nullable|integer|min:30|max:200', // in kg
            'partner_expectations' => 'nullable|string|max:5000',
            'gon_type' => 'nullable|in:Dev,Manushya,Rakshas',
            'rashi' => 'nullable|string|max:255',
            'gotra' => 'nullable|string|max:255',
            'manglik' => 'nullable|in:Yes,No,Anshik',
            'mangal_dosha_details' => 'nullable|string|max:5000',
            'about' => 'nullable|string|max:5000',
            'profile_photo' => 'nullable|image|max:5120',
            'photos.*' => 'nullable|image|max:5120',
        ]);

        // Handle profile_photo file with explicit public disk
        if ($request->hasFile('profile_photo')) {
            $file = $request->file('profile_photo');
            
            Log::info('Profile photo details', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType()
            ]);
            
            $path = $file->store('profiles/' . $user->id, 'public');
            $validated['profile_photo'] = $path;
            
            Log::info('Profile photo stored', ['path' => $path]);
        }

        // Handle album photos (multiple) with explicit public disk
        if ($request->hasFile('photos')) {
            $paths = [];
            foreach ($request->file('photos') as $index => $file) {
                $path = $file->store('profiles/' . $user->id . '/album', 'public');
                $paths[] = $path;
                
                Log::info('Album photo stored', [
                    'index' => $index,
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName()
                ]);
            }
            $validated['photos'] = $paths;
        }

        // Compute age from dob if provided, otherwise use age field
        if (!empty($validated['dob'])) {
            $validated['age'] = Carbon::parse($validated['dob'])->age;
        } elseif (!empty($validated['age'])) {
            // If age is provided directly, use it
            $validated['age'] = (int)$validated['age'];
        }

        $profile = Profile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, ['user_id' => $user->id])
        );

        Log::info('Profile saved successfully', [
            'profile_id' => $profile->id,
            'profile_photo_path' => $profile->profile_photo
        ]);

        return response()->json($profile, 201);
    }

    /**
     * Update authenticated user's profile (partial updates allowed).
     * PUT /api/profile
     */
    public function updateOwn(Request $request)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->firstOrFail();

        Log::info('Profile update request received', [
            'has_profile_photo' => $request->hasFile('profile_photo'),
            'has_photos' => $request->hasFile('photos'),
            'user_id' => $user->id
        ]);

        $validated = $request->validate([
            'gender' => 'sometimes|required|in:male,female,other',
            'dob' => 'sometimes|required|date',
            'city' => 'sometimes|required|string',
            'education' => 'sometimes|nullable|string|max:255',
            'occupation' => 'sometimes|nullable|string|max:255',
            'religion' => 'sometimes|nullable|string|max:255',
            'caste' => 'sometimes|nullable|string|max:255',
            'height' => 'sometimes|nullable|integer|min:100|max:250',
            'weight' => 'sometimes|nullable|integer|min:30|max:200',
            'partner_expectations' => 'sometimes|nullable|string|max:5000',
            'gon_type' => 'sometimes|nullable|in:Dev,Manushya,Rakshas',
            'rashi' => 'sometimes|nullable|string|max:255',
            'gotra' => 'sometimes|nullable|string|max:255',
            'manglik' => 'sometimes|nullable|in:Yes,No,Anshik',
            'mangal_dosha_details' => 'sometimes|nullable|string|max:5000',
            'about' => 'sometimes|nullable|string|max:5000',
            'profile_photo' => 'sometimes|nullable|image|max:5120',
            'photos.*' => 'sometimes|nullable|image|max:5120',
        ]);

        // Replace profile_photo if provided (delete old)
        if ($request->hasFile('profile_photo')) {
            if ($profile->profile_photo) {
                Storage::disk('public')->delete($profile->profile_photo);
                Log::info('Deleted old profile photo', ['path' => $profile->profile_photo]);
            }
            
            $file = $request->file('profile_photo');
            $path = $file->store('profiles/' . $user->id, 'public');
            $validated['profile_photo'] = $path;
            
            Log::info('New profile photo stored', ['path' => $path]);
        }

        // Append album photos if provided
        if ($request->hasFile('photos')) {
            $paths = $profile->photos ?? [];
            foreach ($request->file('photos') as $index => $file) {
                $path = $file->store('profiles/' . $user->id . '/album', 'public');
                $paths[] = $path;
                
                Log::info('New album photo stored', [
                    'index' => $index,
                    'path' => $path
                ]);
            }
            $validated['photos'] = $paths;
        }

        // Compute age from dob if provided
        if (!empty($validated['dob'])) {
            $validated['age'] = Carbon::parse($validated['dob'])->age;
        }

        $profile->update($validated);

        Log::info('Profile updated successfully', [
            'profile_id' => $profile->id,
            'profile_photo_path' => $profile->profile_photo
        ]);

        return response()->json($profile);
    }

    /**
     * Delete profile (only owner can delete).
     * DELETE /api/profiles/{id}
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->where('id', $id)->firstOrFail();

        // Delete files if they exist
        if ($profile->profile_photo) {
            Storage::disk('public')->delete($profile->profile_photo);
            Log::info('Deleted profile photo', ['path' => $profile->profile_photo]);
        }
        
        if ($profile->photos && is_array($profile->photos)) {
            foreach ($profile->photos as $p) {
                Storage::disk('public')->delete($p);
                Log::info('Deleted album photo', ['path' => $p]);
            }
        }

        $profile->delete();

        Log::info('Profile deleted', ['profile_id' => $id, 'user_id' => $user->id]);

        return response()->json(['message' => 'Profile deleted'], 200);
    }

    /**
     * Test method to check storage configuration
     * GET /api/test-storage
     */
    public function testStorage()
    {
        $user = Auth::user();
        
        // Test writing to storage
        Storage::disk('public')->put('test.txt', 'Hello World');
        
        // Test reading from storage
        $content = Storage::disk('public')->get('test.txt');
        
        // Test URL generation
        $url = Storage::disk('public')->url('test.txt');
        
        // Test file existence
        $exists = Storage::disk('public')->exists('test.txt');
        
        return response()->json([
            'content' => $content,
            'url' => $url,
            'exists' => $exists,
            'storage_path' => storage_path('app/public'),
            'public_path' => public_path('storage'),
            'user_id' => $user->id,
        ]);
    }
}