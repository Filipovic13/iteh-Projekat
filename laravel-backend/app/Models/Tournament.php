<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;

    public function registrations()
    {
        return $this->hasMany(Tournament::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
