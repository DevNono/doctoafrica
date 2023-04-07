<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    public function index(Request $request)
    {
        $startWeek = $request->startWeek ?? Carbon::now()->startOfWeek();
        return Inertia::render('Agenda', [
            'startWeek' =>  $startWeek,
            'now' => Carbon::now(),
            'events' => [
                [
                    'title' => 'Event 1',
                    'start' => Carbon::now()->addDays(1),
                    'duration ' => 45,
                ],
                [
                    'title' => 'Event 2',
                    'start' => Carbon::now()->addHours(2),
                    'duration ' => 120,
                ],
                [
                    'title' => 'Event 2',
                    'start' => Carbon::now()->addDays(10),
                    'duration ' => 20,
                ]
            ],
        ]);
    }
}
