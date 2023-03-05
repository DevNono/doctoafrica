<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{

    public function index()
    {
        $messages = Message::all();
        return Inertia::render('Message', compact('messages'));
    }

    public function users()
    {
        $users = User::all();
        return Inertia::render('Users', compact('users'));
    }

    public function store(Request $request)
    {

        $message = Message::create([
            'message' => $request->message,
            'user_id' =>  auth()->user()->id,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return to_route('messages.index');
    }
}
