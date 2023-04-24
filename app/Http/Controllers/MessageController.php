<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\MessageSent;
use App\Http\Resources\ConversationCollection;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\UserCollection;

class MessageController extends Controller
{

    public function store(Request $request)
    {

        $message = Message::create([
            'message' => $request->message,
            'user_id' =>  auth()->user()->id,
            'conversation_id' => $request->conversation,
            'receiver_id' => $request->withUser_id
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message]);;
    }

    public function messageSeen(Request $request){
        $conversation = Conversation::find($request->conversation_id);
        $messageId = $conversation->messages()->latest()->first()->id ?? 0;
        $conversation->users()->where('user_id', '=', auth()->user()->id)->first()->pivot->update([
            'lastRead' => $messageId
        ]);
    }

    public function conversation(Request $request)
    {
        $conversations = new ConversationCollection(auth()->user()->conversations);
        $users = User::all();
        if ($request->withUser_id) {
            $id = $request->withUser_id;
            $conversation = Conversation::whereHas('users', function ($query) use ($id) {
                $query->where('user_id', $id);
            })->whereHas('users', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })->first();
            if (!$conversation) {
                $conversation = Conversation::create();
                $conversation->users()->attach([
                    $id,
                    auth()->user()->id
                ]);
            }
            // Update lastRead au dernier message envoyé dans la conv
            $id= $conversation->messages()->latest()->first()->id ?? 0;
            $conversation->users()->where('user_id', '=', auth()->user()->id)->first()->pivot->update([
                'lastRead' => $id
            ]);
        }

        return Inertia::render('Conversations', [
            'conversation' => $request->withUser_id ? new ConversationResource($conversation) : null,
            'withUser_id' => $request->withUser_id ? $request->withUser_id : null,
            'conversations' => $conversations,
        ]);
    }
}
