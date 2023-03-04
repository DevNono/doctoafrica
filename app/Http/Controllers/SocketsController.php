<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SocketsController extends Controller
{
    public function connect(Request $request)
    {
        $broadcaster = New PusherBroadcaster(
            new Pusher(
                env('PUSHER_APP_KEY'),
                env('PUSHER_APP_SECRET'),
                env('PUSHER_APP_ID'),
                []
            )
        );

        return $broadcaster->validAuthenticationResponse(
            $request, []
        );
    }
}
