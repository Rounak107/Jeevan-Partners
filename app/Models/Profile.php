<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'gender', 'dob', 'age', 'city', 'state', 'country',
        'height', 'weight', 'education', 'occupation', 'income',
        'religion', 'caste', 'mother_tongue', 'about',
        'partner_expectations', 'gon_type', 'rashi', 'gotra',
        'manglik', 'mangal_dosha_details',
        'profile_photo', 'photos',
    ];

    protected $casts = [
        'photos' => 'array',
        'height' => 'integer',
        'weight' => 'integer',
        'age' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}