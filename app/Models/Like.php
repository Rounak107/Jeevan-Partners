<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    
    // Update fillable to match your database columns
    protected $fillable = ['sender_id', 'profile_id'];
    
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    
    public function profile()
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }
    
    // Helper method to get the liked user through the profile
   public function likedUser()
{
    return $this->hasOneThrough(User::class, Profile::class, 'id', 'id', 'profile_id', 'user_id');
}
}