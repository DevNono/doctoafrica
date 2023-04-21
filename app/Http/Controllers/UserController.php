<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Resources\UserCollection;

class UserController extends Controller
{
    public function index()
    {
        return new UserCollection(User::whereNotIn('id', auth()->user()->conversations->pluck('users')->flatten()->pluck('id'))->where('id', '!=', auth()->user()->id)->get());
    }
}
