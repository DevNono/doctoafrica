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
                    'date' => Carbon::now()->addDays(-5)->addHours(2),
                    'duration' => 45,
                ],
                [
                    'title' => 'Event 2',
                    'date' => Carbon::now()->addDays(-4)->addHours(-2),
                    'duration' => 120,
                ],
                [
                    'title' => 'Event 3',
                    'date' => Carbon::now()->addDays(-3)->addHours(-4),
                    'duration' => 20,
                ],
                [
                    'title' => 'Event 4',
                    'date' => Carbon::now()->addDays(-2),
                    'duration' => 60,
                ],
                [
                    'title' => 'Event 5',
                    'date' => Carbon::now()->addDays(-1)->addHours(3),
                    'duration' => 20,
                ],
                [
                    'title' => 'Event 6',
                    'date' => Carbon::now()->addHours(-1),
                    'duration' => 80,
                ],
                [
                    'title' => 'Event 7',
                    'date' => Carbon::now()->addDays(1)->addHours(2),
                    'duration' => 20,
                ]


            ],
        ]);
    }
}
