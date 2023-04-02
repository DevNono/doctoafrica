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
        ]);
    }
}
