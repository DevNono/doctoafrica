<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Message;

class Conversation extends Model
{
    use HasFactory;


    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('lastRead');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function getWithUser()
    {
        return $this->users()->where('user_id', '!=', auth()->user()->id)->first();
    }
}
