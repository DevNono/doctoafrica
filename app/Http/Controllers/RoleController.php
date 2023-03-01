<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\RoleCollection;
use App\Models\Role;

class RoleController extends Controller
{
    public function index(){
        return new RoleCollection(Role::all());
    }
}
