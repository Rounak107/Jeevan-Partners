<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;
use App\Events\NewMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    // List the authenticated user's conversations
    public function index(Request $request)
    {
        $user = $request->user();

        $conversations = Conversation::whereHas('participants', function ($q) use ($user) {
                $q->where('users.id', $user->id);
            })
            ->with([
                'participants:id,name',
                'latestMessage.sender:id,name'
            ])
            ->orderByDesc(
                Message::select('created_at')
                    ->whereColumn('conversation_id', 'conversations.id')
                    ->latest()
                    ->take(1)
            )
            ->get();

        return response()->json($conversations);
    }

    // Create (or reuse) a 1:1 conversation with target user
    public function startConversation(Request $request, $targetUserId)
    {
        $user = $request->user();

        if ($user->id === (int)$targetUserId) {
            return response()->json(['message' => 'Cannot start a conversation with yourself'], 422);
        }

        $target = User::findOrFail($targetUserId);

        // Find an existing conversation where both are participants
        $conversation = Conversation::whereHas('participants', function ($q) use ($user) {
                $q->where('users.id', $user->id);
            })
            ->whereHas('participants', function ($q) use ($target) {
                $q->where('users.id', $target->id);
            })
            ->first();

        if (!$conversation) {
            $conversation = Conversation::create();
            $conversation->participants()->attach([$user->id, $target->id]);
        }

        return response()->json(
            $conversation->load(['participants:id,name', 'latestMessage.sender:id,name'])
        );
    }

    // Get messages for a conversation (with optional polling via ?after_id=123)
    
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $conversation = Conversation::findOrFail($id);

        // Authorization: must be a participant
        if (!$conversation->participants()->where('users.id', $user->id)->exists()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $messages = $conversation->messages()
            ->with(['sender:id,name', 'sender.profile:user_id,profile_photo'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Ensure attachments are properly decoded for all messages
        $messages->transform(function ($message) {
            if ($message->attachments) {
                $message->attachments = is_string($message->attachments) 
                    ? json_decode($message->attachments, true) 
                    : $message->attachments;
            }
            return $message;
        });

        return response()->json([
            'conversation' => $conversation->load('participants:id,name'),
            'messages'     => $messages,
            'current_user_id' => $user->id
        ]);
    }

    /**
     * Send a message to a conversation (accept file attachments)
     */
    public function sendMessage(Request $request, $id)
    {
        $user = $request->user();
        $conversation = Conversation::findOrFail($id);

        if (!$conversation->participants()->where('users.id', $user->id)->exists()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'body' => ['nullable', 'string', 'max:5000'],
            'attachments.*' => ['file', 'max:10240'], // 10MB
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store("messages/{$conversation->id}/{$user->id}", 'public');
                
                $url = Storage::disk('public')->url($path);
                
                $attachments[] = [
                    'url'  => $url,
                    'name' => $file->getClientOriginalName(),
                    'type' => $file->getMimeType(),
                    'path' => $path
                ];
            }
        }

        if (empty($validated['body']) && empty($attachments)) {
            return response()->json(['message' => 'Message cannot be empty'], 422);
        }

        $message = $conversation->messages()->create([
            'sender_id'   => $user->id,
            'body'        => $validated['body'] ?? null,
            'attachments' => !empty($attachments) ? json_encode($attachments) : null,
        ]);

        // Load sender with profile
        $message->load(['sender:id,name', 'sender.profile:user_id,profile_photo']);

        // Decode attachments for response
        if ($message->attachments) {
            $message->attachments = json_decode($message->attachments, true);
        }

        // Log before broadcasting
\Log::info('Broadcasting NewMessage event', [
    'message_id' => $message->id,
    'conversation_id' => $conversation->id,
    'sender_id' => $user->id,
    'participants' => $conversation->participants->pluck('id')
]);

        // BROADCAST THE MESSAGE TO OTHER PARTICIPANTS
        broadcast(new NewMessage($message))->toOthers();

        \Log::info('NewMessage event broadcasted');

        return response()->json($message, 201);
    }


    /**
     * Broadcast new message to other participants in the conversation
     */
    private function broadcastNewMessage(Message $message, Conversation $conversation, User $sender)
    {
        try {
            // Get other participants (excluding the sender)
            $otherParticipants = $conversation->participants()
                ->where('users.id', '!=', $sender->id)
                ->get();

            // Prepare the message data for broadcasting
            $messageData = [
                'id' => $message->id,
                'conversation_id' => $message->conversation_id,
                'sender_id' => $message->sender_id,
                'body' => $message->body,
                'attachments' => $message->attachments,
                'created_at' => $message->created_at->toISOString(),
                'updated_at' => $message->updated_at->toISOString(),
                'sender' => [
                    'id' => $message->sender->id,
                    'name' => $message->sender->name,
                    'profile' => $message->sender->profile ? [
                        'profile_photo' => $message->sender->profile->profile_photo
                    ] : null
                ]
            ];

            // Broadcast to each participant
            foreach ($otherParticipants as $participant) {
                // Use Laravel broadcasting or your socket server
                // This example uses a generic event name - adjust based on your socket implementation
                event(new \App\Events\NewMessage($messageData, $participant->id));
                
                // If using Laravel Echo Server or Soketi, you might do:
                // broadcast(new \App\Events\NewMessage($messageData))->toOthers();
                
                Log::info("Broadcasting message to user: {$participant->id}");
            }

            // Alternative: Broadcast to a conversation channel
            // This is more efficient if you have channel-based setup
            event(new \App\Events\NewMessage($messageData, $conversation->id));

        } catch (\Exception $e) {
            Log::error("Failed to broadcast message: " . $e->getMessage());
        }
    }
}