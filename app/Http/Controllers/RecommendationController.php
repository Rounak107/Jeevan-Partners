<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;

class RecommendationController extends Controller
{
    /**
     * GET /api/recommendations
     * Query params (optional): gender, min_age, max_age, city, page, per_page
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Require a base profile
        $meProfile = $user->profile;
        if (!$meProfile) {
            return response()->json(['message' => 'Complete your profile first'], 400);
        }

        // Gender handling:
        // - If query gender is '', treat as "use default target"
        // - If 'any', do not filter by gender
        // - Else use provided gender
        $genderParam = trim((string) $request->query('gender', ''));
        $genderFilter = null;
        if ($genderParam === '') {
            $genderFilter = $this->defaultTargetGender($meProfile->gender);
        } elseif (strtolower($genderParam) !== 'any') {
            $genderFilter = $genderParam;
        }

        $minAge = (int) $request->query('min_age', max(18, ($meProfile->age ?? 25) - 5));
        $maxAge = (int) $request->query('max_age', ($meProfile->age ?? 25) + 5);
        $cityFilter = $request->query('city');

        // Scoring with proper bindings
        $scoreExpr = "(CASE WHEN city = ? THEN 20 ELSE 0 END)
                    + (CASE WHEN ABS(age - ?) <= 2 THEN 15
                            WHEN ABS(age - ?) <= 5 THEN 8
                            ELSE 0 END)
                    + (CASE WHEN education = ? THEN 5 ELSE 0 END)
                    + (CASE WHEN religion = ? THEN 10 ELSE 0 END)";

        $bindings = [
            $meProfile->city ?? '',
            (int) ($meProfile->age ?? 0),
            (int) ($meProfile->age ?? 0),
            $meProfile->education ?? '',
            $meProfile->religion ?? '',
        ];

        // Base query with eager-load for user (frontend expects profile.user.name)
        $query = Profile::with('user')
            ->where('user_id', '!=', $user->id)
            ->whereBetween('age', [$minAge, $maxAge]);

        if ($genderFilter) {
            $query->where('gender', $genderFilter);
        }

        if (!empty($cityFilter)) {
            $query->where('city', 'LIKE', '%' . $cityFilter . '%');
        }

        // Select fields + computed score (using bindings!)
        $query->select('profiles.*')
              ->selectRaw("($scoreExpr) as score", $bindings)
              ->orderByDesc('score')
              ->orderByDesc('profiles.updated_at');

        $perPage = (int) $request->query('per_page', 12);
        $results = $query->paginate($perPage)->withQueryString();

        return response()->json($results);
    }

    private function defaultTargetGender($myGender)
    {
        // default: opposite gender, fallback to 'female'
        if ($myGender === 'male') return 'female';
        if ($myGender === 'female') return 'male';
        return 'female';
    }
}