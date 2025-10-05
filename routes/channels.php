<?php

use Illuminate\Support\Facades\Broadcast;

// FIX: Update channel name to match your event
Broadcast::channel('private-conversation.{conversationId}', function ($user, $conversationId) {
    // Check if user is a participant in the conversation
    return \App\Models\Conversation::where('id', $conversationId)
        ->whereHas('participants', function ($query) use ($user) {
            $query->where('users.id', $user->id);
        })
        ->exists();
});